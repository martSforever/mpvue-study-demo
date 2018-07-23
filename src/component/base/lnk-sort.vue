<template>
  <div class="lnk-sort" :style="lnkSortStyles" @click="_handleClick">
    <picker @change="_handleChange" :range="options">
      <label>{{label}}</label>
      <lnk-icon icon="triangle-down"/>
    </picker>
  </div>
</template>

<script>
  import LnkIcon from "./lnk-icon";
  import {styles} from "../../common/css";

  export default {
    name: "lnk-sort",
    components: {LnkIcon},
    props: {
      label: {
        type: String,
        default: '排序'
      },
      backgroundColor: {
        type: String,
        default: '#ededef'
      },
      value: null,
      options: {
        type: Array,
        default: [
          'aaa',
          'bbb',
          'ccc',
          'ddd',
          'eee',
          'fff',
          'hhh',
          'iii',
          'ggg',
        ]
      }
    },
    computed: {
      lnkSortStyles() {
        return styles({
          backgroundColor: this.backgroundColor
        })
      },
    },
    methods: {
      _handleClick() {

      },
      _handleChange(e) {
        this.value = e.target.value;
        this.$emit('input', this.options[this.value]);
        this.$emit('change', this.options[this.value]);
      },
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/variables";

  .lnk-sort{
    display: inline-flex;
    color: $font-color-support;
    font-size: 13px;
    border-radius: 15px;
    letter-spacing: 1.5px;
    width: 112px;
    padding: 6px 0;
    align-items: center;
    justify-content: center;
    .lnk-icon{
      margin-left: 6px;
    }
  }

</style>
