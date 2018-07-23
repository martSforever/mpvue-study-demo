<template>
  <div class="lnk-square-btn" @click="__handleClick">
    <label v-show="!!label">{{label}}</label>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "lnk-square-btn",
    props: {
      label: ''
    },
    methods: {
      __handleClick(e) {
        this.$emit('click', e)
      },
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/variables";

  .lnk-square-btn{
    box-sizing: border-box;
    border: solid 4px $font-color-support;
    color: $font-color-support;
    padding: 12px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

</style>
