<template lang="pug">
  div.container
    div.box
      span(
        class="fx",
        :class="{ 'pulse' : isRecording }")
      button(
        class="start-record",
        id="start-record",
        :class="{ 'start-record-alert' : isRecording }",
        @click="init()") {{ buttonRecord }}
    transition(name="fade")
      video(
        autoplay,
        class="video-preview",
        v-if="isRecording"
        ref="preview")
</template>

<script>
export default {
  name: 'Recordall',
  data () {
    return {
      recorder: '',
      isRecording: false,
      buttonRecord: 'START RECORD'
    }
  },

  methods: {
    init () {
      this.isRecording ? this.stop() : this.start()
    },

    start () {
      console.log('Starting record')
      chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab'], this.initRecord)
    },

    stop () {
      this.isRecording = false
      this.buttonRecord = 'START RECORD'
      console.log('Stopping record')
      this.recorder.ondataavailable = (e) => {
        console.log(e)
      }
      this.recorder.stop()
    },

    initRecord (id) {
      this.isRecording = true
      this.buttonRecord = 'STOP RECORD'
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
      // @TODO: handle error to stop effects also
      console.log(e)
    }
  }
}
</script>
