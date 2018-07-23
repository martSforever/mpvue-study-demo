<template>
  <div class="lnk-avatar" :style="lnkAvatarStyles">
    <image :src="image"></image>
    <image :src="clipImage"></image>
    <lnk-icon icon="crown" v-if="isVip"/>
  </div>
</template>

<script>

  import {styles} from "../../common/css";
  import LnkIcon from "./lnk-icon";

  const clipImage = require('../../assets/images/front-avatar.png');

  export default {
    name: "lnk-avatar",
    components: {LnkIcon},
    props: {
      size: {
        type: String,
        default: '72px',
        desc: '头像大小'
      },
      image: {
        type: String,
        required: true,
        desc: '头像图片地址'
      },
      isVip: {
        type: Boolean,
        default: false,
        desc: '是否为vip'
      }
    },
    data() {
      return {
        clipImage: clipImage
      }
    },
    onLoad() {
      if (!this.image) {
        console.error('the props image is null!');
        return;
      }
    },
    computed: {
      lnkAvatarStyles() {
        return styles({
          width: this.size,
          height: this.size
        })
      },
    }
  }
</script>

<style lang="scss">

.lnk-avatar{
  position: relative;
  image,.lnk-icon{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .lnk-icon{
    position: absolute;
    top: -10px;
    left: -10px;
    color: #ff4a64;
    width: 24px;
    height: 24px;
    transform: rotate(-45deg);
    font-size: 24px;
  }
}

</style>
