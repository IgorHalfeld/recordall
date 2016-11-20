<template lang="pug">
  section.settings-content
    label(
      for="location-save",
      class="location-save-title") Save on...
    input(
      type="text",
      class="location-save-place",
      id="location-save",
      v-model="locationSave")
</template>

<script>
import getPlaceWhereSave from '../../modules/getPlaceWhereSave'

export default {
  name: 'settings-content',
  data () {
    return {
      locationSave: '~/Video'
    }
  }
}
</script>
