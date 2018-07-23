<template>
  <div class="lnk-tab" v-show="name === currentName">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "lnk-tab",
    props: {
      name: {
        type: String,
        default: 'lnk-tab'
      },
      default: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentName: ''
      }
    },
  }
</script>

