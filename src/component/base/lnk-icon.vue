<template>
  <i class="iconfont lnk-icon" :class="iconfont" @click="_handleClick" :style="styles"></i>
</template>

<script>
  import {CONST} from "../../common/const";
  import {classes, styles} from "../../common/css";

  export default {
    name: "lnk-icon",
    props: {
      icon: {
        type: String,
        default: 'search',
        desc: '阿里巴巴icon图标'
      },
      color: {
        type: String
      },
      size: {
        type: String
      },
      iconClass: {
        type: String
      }
    },
    computed: {
      iconfont() {
        return classes({
          [`${CONST.icon_prefix}-${this.icon}`]: true,
        }) + ` ${this.iconClass}`
      },
      styles() {
        let styleObj = {}
        if (!!this.color) {
          styleObj.color = this.color
        }
        if (!!this.size) {
          styleObj.fontSize = this.size
        }
        return styles(styleObj)
      },
    },
    methods: {
      _handleClick() {
        this.$emit('click', arguments);
      },
    }
  }
</script>

<style lang="scss">
  .iconfont {
    display: inline-block;
    font-size: inherit;
  }
</style>
