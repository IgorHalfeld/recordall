<template lang="pug">
  div(
    class="settings",
    :class="{ 'open': isOpen }")

    //- Header - icon with label
    HeaderContent

    //- Settings - local to save and more...
    SettingsContent
</template>

<script>
import HeaderContent from './settings-header.vue'
import SettingsContent from './settings-content.vue'
import setPlaceWhereSave from '../../modules/setPlaceWhereSave'

setPlaceWhereSave({ changed: false, place: '~/Videos' })

export default {
  name: 'settings',
  components: { HeaderContent, SettingsContent },
  data () {
    return {
      isOpen: false
    }
  },

  mounted () {
    Emitter.on('settings-status', (status) => this.isOpen = status)
  }
}
</script>
