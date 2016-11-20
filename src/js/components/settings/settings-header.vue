<template lang="pug">
  header(
    class="header",
    :class="{ 'header-open': isOpen }")
    div(
      class="header-title",
      :class="{ 'title-open': isOpen }")
      h3(
        class="title",
        v-if="isOpen") Settings
    svg(
      class="icon-settings",
      :class="{ 'icon-open': isOpen }",
      @click="openSettings(isOpen)")
      use(xlink:href="#icon-settings")
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  },

  methods: {
    openSettings (isOpen) {
      this.isOpen = isOpen ? false : true
      Emitter.emit('settings-status', this.isOpen)
      return this.isOpen
    }
  }
}
</script>
