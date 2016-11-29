<template lang="pug">
  section.settings-content
    div.settings-checkbox
      input(
        type="checkbox",
        id="audio",
        class="settings-audio-checkbox",
        v-model="canRecordingAudio")
      label(for="audio") Audio
</template>

<script>
export default {
  name: 'settings-content',
  data () {
    return {
      canRecordingAudio: false
    }
  }
}
</script>
