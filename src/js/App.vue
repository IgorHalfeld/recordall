<template lang="pug">
  div
    div.container
      transition(name="fade")
        div(
          class="container-modal",
          v-show="isRecordingEnd")
          h2(class="modal-title") You just need click bellow to download the screencast!
          input(
            class="modal-input",
            type="text",
            v-model="screencastName")
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
      transition(name="fade")
        strong(v-if="isRecording") {{ videoTime }}
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
      isRecordingEnd: false,
      videoIntervalTime: undefined,
      videoTime: undefined,
      screencastName: undefined
    }
  },

  computed: {
    buttonRecord () {
      return this.isRecording ? 'STOP RECORD' : 'START RECORD'
    }
  },

  // TODO: Comments all methods
  methods: {

    /**
     * Start or stop recording
     */
    init () {
      this.isRecording ? this.stop() : this.start()
    },

    /**
     * Notificate that the screencast has been downloaded
     */
    download () {
      this.isRecordingEnd = false
      this.$refs.target.download = `${this.screencastName}.webm`
      NotificationHelper('Your screencast was saved on download\'s folder.')
    },

    /**
     * Pick up how many hours have passed
     */
    calculateTime () {
      const now = new Date().getTime()
      const self = this
      let resultTime = undefined

      this.videoIntervalTime = window.setInterval(function () {
        resultTime = new Date(Math.abs(now - new Date().getTime()))

        // TODO: Refactor this code to do more, with less
        const h = (resultTime.getHours() < 10) ? `0${resultTime.getHours()}` : resultTime.getHours()
        const m = (resultTime.getMinutes() < 10) ? `0${resultTime.getMinutes()}` : resultTime.getMinutes()
        const s = (resultTime.getSeconds() < 10) ? `0${resultTime.getSeconds()}` : resultTime.getSeconds()

        self.videoTime = `${h}:${m}:${s}`
        console.log(self.videoTime)
      }, 1000)
    },

    /**
     * Clear the interval that counted the video
     */
    destroyed () {
      window.cleanInterval(this.videoIntervalTime)
    },

    /**
     * Start chrome recording function
     */
    start () {
      console.log('Starting record')
      chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab'], this.initRecord)
    },

    /**
     * Stop recording and put video on download button
     */
    stop () {
      this.isRecording = false
      this.recorder.stop()

      console.log('Stopping record')

      // Stop handler
      this.recorder.addEventListener('stop', (evt) => {
        this.isRecordingEnd = true
        this.$refs.target.href = URL.createObjectURL(new Blob(this.chunks, { type: 'video/webm' }))
        this.screencastName = 'My awesome screencast'
        this.stream = null
      })
    },

    /**
     * Init recording with coinstraints
     */
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

    /**
     * If be success on get permissons
     */
    gotStream (stream) {
      this.stream = stream
      this.$refs.preview.src = URL.createObjectURL(this.stream)
      this.recorder = new MediaRecorder(this.stream, {
        mimeType: 'video/webm'
      })
      this.recorder.start()
      this.calculateTime()

      // Reciever the data
      this.recorder.addEventListener('dataavailable', (evt) => {
        this.chunks.push(evt.data);
      })
    },

    /**
     * If get an error on get permissons
     */
    getUserMediaError (e) {
      // @TODO: handle error to stop effects as well
      console.log(e)
    }
  }
}
</script>
