<template>
  <div class="lnk-dialog" :style="dialogStyles" @transitionend="handleTransitionend">
    <div class="lnk-dialog-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  /*
  *   power by    weishengjian
  *   datetime    2018/7/16 13:47
  *   desc        对话框组件
  */

  import {styles} from "../../common/css";

  /*对话框内容位置*/
  const ALIGN = {
    top: 'flex-start',
    bottom: 'flex-end',
    center: 'center',
    left: 'flex-start',
    right: 'flex-end'
  }

  /*对话框出现动画，横向*/
  const SHOW_ANIMATION_X = {
    top: '0',
    bottom: '0',
    left: '-100%',
    right: '100%',
    none: '0'
  }

  /*对话框出现动画，纵向*/
  const SHOW_ANIMATION_Y = {
    top: '-100%',
    bottom: '100%',
    left: '0',
    right: '0',
    none: '0'
  }

  export default {
    name: "lnk-dialog",
    props: {
      value: false,
      shadowBackgroundColor: {
        type: String,
        default: 'rgba(0,0,0,0.1)',
        desc: '遮罩层背景色'
      },
      animationDuration: {
        type: String,
        default: 0.4,
        desc: '动画时长'
      },
      verticalPosition: {
        type: String,
        default: 'center',
        desc: '内容纵向位置'
      },
      horizontalPosition: {
        type: String,
        default: 'center',
        desc: '内容横向位置'
      },
      showPosition: {
        type: String,
        default: 'none',
        desc: '动画，内容出现的位置'
      },
      propsData: {
        type: Object,
        default: {}
      },

    },
    data() {
      return {
        currentValue: this.value,
        display: this.value
      }
    },
    onLoad() {
      // console.log('propsData', this.propsData)
    },
    watch: {
      value(newVal) {
        if (newVal !== this.currentValue) {
          this.currentValue = newVal;
          this.display = true
        }
      },
      currentValue(newVal) {
        this.$emit('input', newVal)
        this.$emit(newVal ? 'show' : 'hide', newVal)
      },
    },
    methods: {
      close() {
        this.currentValue = false
      },
      handleTransitionend() {
        this.display = this.currentValue
      },
    },
    computed: {
      dialogStyles() {
        return styles({
          display: this.display ? '' : 'none',
          opacity: this.currentValue ? 1 : 0,
          backgroundColor: this.shadowBackgroundColor,
          alignItems: ALIGN[this.verticalPosition],
          justifyContent: ALIGN[this.horizontalPosition],
          transition: `all ${this.animationDuration}s`,
          transform: `translate(${this.currentValue ? 0 : SHOW_ANIMATION_X[this.showPosition]},${this.currentValue ? 0 : SHOW_ANIMATION_Y[this.showPosition]})`,
        })
      },
    }
  }
</script>

<style lang="scss">

  .lnk-dialog{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    display: flex;
  }

</style>
