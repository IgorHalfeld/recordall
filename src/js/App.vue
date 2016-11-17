<template lang="pug">
  div.container
    span(
      class="fx",
      :class="{ 'pulse' : isRecording }")
    button(
      class="start-record",
      id="start-record",
      :class="{ 'start-record-alert' : isRecording }",
      @click="init()") {{ buttonRecord }}
</template>

<script>
export default {
  name: 'Recordall',
  data () {
    return {
      isRecording: false,
      buttonRecord: 'START RECORD'
    }
  },

  methods: {
    init () {
      this.isRecording ? this.stop() : this.start()
    },

    start () {
      this.isRecording = true
      console.log('Starting record')
    },

    stop () {
      this.isRecording = false
      console.log('Stopping record')
    }
  }
}
</script>
