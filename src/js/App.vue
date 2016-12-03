<template lang="pug">
  div
    div.container
      transition(name="fade")
        div(
          class="container-modal",
          v-if="isRecordingEnd")
          h2(class="modal-title") You just need click bellow to download the screencast!
          a(
            class="modal-button",
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
    Settings
</template>

<script>
import Settings from './components/settings/settings.vue'

export default {
  name: 'Recordall',
  components: { Settings },
  data () {
    return {
      recorder: '',
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
    },

    start () {
      console.log('Starting record')
      chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab'], this.initRecord)
    },

    stop () {
      this.isRecording = false
      console.log('Stopping record')
      this.recorder.ondataavailable = (e) => {
        console.log(URL.createObjectURL(e.data))
        this.isRecordingEnd = true
      }
      this.recorder.stop()
    },

    initRecord (id) {
      this.isRecording = true
      navigator.webkitGetUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        }
      }, this.gotStream, this.getUserMediaError)
    },

    gotStream (stream) {
      console.log(stream)
      this.$refs.preview.src = URL.createObjectURL(stream)
      this.recorder = new MediaRecorder(stream)
      this.recorder.start()
    },

    getUserMediaError (e) {
      // @TODO: handle error to stop effects as well
      console.log(e)
    }
  }
}
</script>
