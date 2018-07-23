<template>
  <div class="lnk-float-btn">
    <lnk-icon :icon="icon"/>
  </div>
</template>

<script>
  import LnkIcon from "./lnk-icon";

  export default {
    name: "lnk-float-btn",
    components: {LnkIcon},
    props: {
      icon: {
        type: String,
        default:'customer-service',
        desc:'悬浮按钮图标'
      }
    }
  }
</script>

<style lang="scss">

.lnk-float-btn{
  position: fixed;
  right: 25px;
  bottom: 25px;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background-color: white;
  box-shadow: #ddd 1px 2px 10px 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

</style>
