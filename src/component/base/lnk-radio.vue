<template>
  <div class="lnk-radio" @click.stop="_handleClick" :class="{active:currentValue}">
    <lnk-icon :icon="inactiveIcon" :color="color" icon-class="inactive-icon"/>
    <lnk-icon :icon="activeIcon" :color="color" icon-class="active-icon"/>
    <!--<div class="child"></div>-->
  </div>
</template>

<script>
  import LnkIcon from "./lnk-icon";
  import {CONST} from "../../common/const";

  export default {
    name: "lnk-radio",
    components: {LnkIcon},
    props: {
      activeIcon: {
        type: String,
        default: 'checked'
      },
      inactiveIcon: {
        type: String,
        default: 'uncheck'
      },
      value: false,
      activeColor: {
        type: String,
        default: CONST.vip_color
      },
      inactiveColor: {
        type: String,
        default: '#b6b6b6'
      }
    },
    watch: {
      value(val) {
        if (this.currentValue !== val) {
          this.currentValue = val
        }
      },
      currentValue(val) {
        this.$emit('input', val)
      },
    },
    data() {
      return {
        currentValue: this.value
      }
    },
    computed: {
      color() {
        return this.currentValue ? this.activeColor : this.inactiveColor
      },
    },
    methods: {
      _handleClick() {
        this.currentValue = !this.currentValue
      },
    }
  }
</script>

<style lang="scss">

  .lnk-radio {
    position: relative;
    display: inline-block;
    line-height: 1em;
    .lnk-icon {
      vertical-align: top;
      transition: all 0.4s;
    }
    .active-icon {
      position: absolute;
      top: 0;
      left: 0;
      transform: scale(0);
    }
    .inactive-icon {
      transform: scale(1);
    }
    &.active {
      .active-icon {
        transform: scale(1);
      }
      .inactive-icon {
        transform: scale(0);
      }
    }
  }

</style>
