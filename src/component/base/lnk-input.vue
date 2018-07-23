<template>
  <div class="lnk-input" :style="lnkInputStyles" @click="_handleClick" :class="lnkInputClasses">
    <div class="icon-wrapper" v-if="!!icon" :style="iconWrapperStyles">
      <lnk-icon :icon="icon"/>
    </div>
    <div class="input-wrapper">
      <input
        v-model="currentValue"
        :placeholder="placeholder"
        :disabled="disabled"
        placeholder-class="placeholder-class"
        @confirm="_handleConfirm"
        @input="_handleInput"
      />
    </div>
  </div>
</template>

<script>
  import {classes, styles} from "../../common/css";
  import LnkIcon from "./lnk-icon";

  export default {
    name: "lnk-input",
    components: {LnkIcon},
    props: {
      value: '',
      icon: {
        type: String,
        desc: '输入框图标'
      },
      iconPosition: {
        type: String,
        desc: '输入框图标位置，只有left|right两个值',
        default: 'right'
      },
      backgroundColor: {
        type: String,
        default: '#ffffff',
        desc: '输入框背景色'
      },
      placeholder: {
        type: String,
        default: '请输入...',
        desc: '输入框为空时占位符'
      },
      shape: {
        type: String,
        default: 'fillet',
        desc: '输入框形状，fillet：圆角、round：圆形、none：无圆角'
      },
      width: {
        type: String,
        default: '280px'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentValue: ''
      }
    },
    onLoad() {
      this.currentValue = this.value;
    },
    watch: {
      value(newVal) {
        if (this.currentValue !== newVal) {
          console.log('set val', newVal, this.currentValue)
          this.currentValue = newVal;
        }
      },
    },
    computed: {
      lnkInputStyles() {
        return styles({
          backgroundColor: this.backgroundColor,
          width: this.width
        })
      },
      iconWrapperStyles() {
        return styles({
          order: this.iconPosition === 'right' ? 2 : 0
        })
      },
      lnkInputClasses() {
        return classes({
          [`lnk-input-${this.shape}`]: !!this.shape
        })
      },
    },
    methods: {
      _handleConfirm(e) {
        this.$emit('confirm', e)
      },
      _handleClick() {
        this.$emit('click', arguments);
      },
      _handleInput(e) {
        this.$nextTick(() => this.$emit('input', e.target.value))
      },
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/variables";

  .lnk-input{
    display: inline-flex;
    align-items: center;
    color: $font-color-deep;
    box-sizing: border-box;
    &.lnk-input-none{
      border: none;
    }
    &.lnk-input-fillet{
      border-radius: 6px;
    }
    &.lnk-input-round{
      border-radius: 33px;
    }

    .icon-wrapper{
      height: 33px;
      width: 33px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      .iconfont{
        font-size: 16px;
        color: $color-placeholder;
      }
    }
    .input-wrapper{
      order: 1;
      flex: 1;
      padding: 8px 0;
      input{
        height: 100%;
        font-size: 15px;
        width: 100%;
      }
    }
  }
  .placeholder-class{
    color: $color-placeholder;
  }

</style>
