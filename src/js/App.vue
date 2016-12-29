<template lang="pug">
  div
    div.container
      transition(name="fade")
        div(
          class="container-modal",
          v-show="isRecordingEnd")
          h2(class="modal-title") You just need click bellow to download the screencast!
          a(
            class="modal-button",
            ref="target",
            @click="download()") Get it
      div.box
        span(
          class="fx",
          :class="{ 'pulse' : isRecording }")
        button(
          class="start-record",
          id="start-record",
          :class="{ 'start-record-alert' : isRecording }",
          @click="init()")
          svg(
            class="icon-record",
            :class="{ 'icon-recording': isRecording }",)
            use(xlink:href="#icon-record")
          br
          | {{ buttonRecord }}
      transition(name="fade")
        video(
          autoplay,
          class="video-preview",
          v-if="isRecording"
          ref="preview")
</template>

<script>
import NotificationHelper from './modules/notification-helper'
import Settings from './components/settings/settings.vue'

export default {
  name: 'Recordall',
  components: { Settings },
  data () {
    return {
      recorder: '',
      stream: null,
      chunks: [],
      isRecording: false,
      isRecordingEnd: false
    }
  },

  computed: {
    buttonRecord () {
      return this.isRecording ? 'STOP RECORD' : 'START RECORD'
    }
  },

  methods: {
    init () {
      this.isRecording ? this.stop() : this.start()
    },

    download () {
      this.isRecordingEnd = false
      NotificationHelper('Your screencast was saved on Download\'s folder.')
    },

    start () {
      console.log('Starting record')
      chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab'], this.initRecord)
    },

    stop () {
      this.isRecording = false
      this.recorder.stop()

      console.log('Stopping record')

      // Stop handler
      this.recorder.addEventListener('stop', (evt) => {
        this.isRecordingEnd = true
        this.$refs.target.href = URL.createObjectURL(new Blob(this.chunks, { type: 'video/webm' }))
        this.$refs.target.download = `screencast ${new Date()}.webm`
        this.stream = null
      })
    },

    initRecord (id) {
      this.isRecording = true
      navigator.mediaDevices.getUserMedia({
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: id,
            minWidth: 1280,
            maxWidth: 1920,
            minHeight: 720,
            maxHeight: 1080
          }
        }
      })
      .then(this.gotStream)
      .catch(this.getUserMediaError)
    },

    gotStream (stream) {
      this.stream = stream
      this.$refs.preview.src = URL.createObjectURL(this.stream)
      this.recorder = new MediaRecorder(this.stream, {
        mimeType: 'video/webm'
      })
      this.recorder.start()

      // Reciever the data
      this.recorder.addEventListener('dataavailable', (evt) => {
        this.chunks.push(evt.data);
      })
    },

    getUserMediaError (e) {
      // @TODO: handle error to stop effects as well
      console.log(e)
    }
  }
}
</script>
