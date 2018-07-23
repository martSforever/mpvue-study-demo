<template>
  <div class="lnk-tabbar">
    <div class="lnk-tab-head" v-if="showHead">
      <div
        class="lnk-tab-head-item"
        v-for="(tabName,index) in tabNames"
        :key="index"
        :class="{active:tabName === currentValue}"
        @click="_handleChange(tabName)"
      >
        {{tabName}}
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>

  /*
  *   power by    weishengjian
  *   datetime    2018/7/13 10:43
  */
  /*

  !!!特别注意，在lnk-tab内，不可以访问外部数据，比如lnk-tab的slot中的内容不能访问lnk-tabbar外父作用域的数据

  代码实例
      <lnk-tabbar>
        <lnk-tab name="产品">产品内容</lnk-tab>
        <lnk-tab name="案例">案例</lnk-tab>
        <lnk-tab name="灵感" :default="true">灵感</lnk-tab>
        <lnk-tab name="晒单">晒单</lnk-tab>
      </lnk-tabbar>

  最佳实例：
      <lnk-tabbar>
        <lnk-tab name="产品">
          <inspiration-prod/>
        </lnk-tab>
        <lnk-tab name="案例" :default="true">
          <inspiration-case/>
        </lnk-tab>
      </lnk-tabbar>
  */

  import {findComponentsDownward} from "../../../common/dom";

  export default {
    name: "lnk-tabbar",
    props: {
      value: null,
      showHead: {
        type: Boolean,
        default: true
      }
    },
    components: {},
    data() {
      return {
        tabNames: [],
        currentValue: this.value
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
        this._handleChange(val)
      },
    },
    mounted() {
      let defaultName = null;
      findComponentsDownward(this, 'lnk-tab').forEach((tab) => {
        this.tabNames.push(tab.name)
        !defaultName && (defaultName = !!tab.default ? tab.name : null)
      });
      !defaultName && (defaultName = this.tabNames[0]);
      !!this.value && (defaultName = this.value);
      this.$nextTick(() => this._handleChange(defaultName));
    },
    computed: {},
    methods: {
      _handleChange(tabName) {
        this.currentValue = tabName;
        findComponentsDownward(this, 'lnk-tab').forEach((tab) => tab.currentName = tabName);
      },
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/css/variables";

  .lnk-tabbar{
    .lnk-tab-head{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .lnk-tab-head-item{
        color: $font-color-support;
        font-size: 16px;
        padding-bottom: 12px;
        box-sizing: border-box;
        border-bottom: solid 2px transparent;
        &.active{
          border-bottom: solid 2px black;
          color: $font-color-deep;
        }
      }
    }
  }

</style>
