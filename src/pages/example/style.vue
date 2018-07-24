<template>
  <div class="style">
    <button @click="changeTag">change</button>
    <div :class="cls1">class绑定（按照vue原来的方式绑定对象是不行的）</div>
    <div :class="{red:tag,blue:!tag}">class绑定（mpvue官方推荐绑定方式，在template中绑定）</div>
    <div :class="cls2">class绑定（通过全局函数转换，也就是官方推荐的转换为字符串）</div>
    <div :style="styles1">style绑定（按照vue原来的方式绑定对象是不行的）</div>
    <div :style="{backgroundColor:tag?'brown':'dodgerblue'}">style绑定（mpvue官方推荐绑定方式，在template中绑定）</div>
    <div :style="styles2">class绑定（通过全局函数转换，也就是官方推荐的转换为字符串）</div>
  </div>
</template>

<script>
  import {classes, styles} from "../../common/css";

  export default {
    name: "style",
    data() {
      return {
        tag: true,
      }
    },
    methods: {
      changeTag() {
        this.tag = !this.tag
      },
    },
    computed: {
      cls1() {
        return {
          red: this.tag,
          blue: !this.tag
        }
      },
      cls2() {
        return classes({
          red: this.tag,
          blue: !this.tag
        })
      },

      styles1() {
        return {
          backgroundColor: this.tag ? 'brown' : 'dodgerblue'
        }
      },
      styles2() {
        return styles({
          backgroundColor: this.tag ? 'brown' : 'dodgerblue'
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .style {
    & > div {
      margin-bottom: 12px;
      padding: 12px;
      color: white;
      letter-spacing: 2px;
      background-color: gray;
      transition: all 0.4s;
    }

    .red {
      background-color: brown;
    }

    .blue {
      background-color: dodgerblue;
    }
  }
</style>
