<template>
  <div class="filter-tab" :class="wrapperClasses">
    <div class="text-wrapper">
      <div class="text" @click="_handleClickFilterTabText">
        <label>{{filterData.name}}</label>
        <lnk-icon icon="triangle-down"/>
      </div>
    </div>
    <div class="shadow-wrapper" @click.stop="_handleClickShadowWrapper">
      <div class="content" @click.stop="_handleClickContent" :style="contentStyles">
        <div class="option-list">
          <div class="option-item" v-for="(item,index) in filterData.options" :key="index"
               :class="{'active-option':item._isChecked}" @click="_handleClickOptionItem(item,index)">
            <label class="name">{{item.name}}</label>
            <lnk-icon icon="check" size="18px" v-if="item._isChecked"/>
          </div>
        </div>
        <div class="btn-wrapper">
          <div class="btn reset" @click="_handleReset">重置</div>
          <div class="btn confirm" @click="_handleConfirm">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LnkIcon from "../base/lnk-icon";
  import {classes, styles} from "../../common/css";

  export default {
    name: "filter-tab",
    components: {LnkIcon},
    props: {
      filterData: {
        type: String,
        default: '无'
      },
      show: {
        type: Boolean,
        default: false
      },
      contentTop: {
        type: String,
        default: '0'
      }
    },
    data() {
      return {
        currentShow: this.show,
      }
    },
    watch: {
      show(val) {
        if (this.currentShow !== val) {
          this.currentShow = val
        }
      },
      currentShow(val) {
        this.$emit('update:show', val)
      },
    },
    computed: {
      wrapperClasses() {
        return classes({
          active: this.currentShow
        })
      },
      contentStyles() {
        return styles({
          top: this.contentTop
        })
      },
    },
    methods: {
      _handleClickFilterTabText() {
        this.currentShow = true;
      },
      /*组织事件冒泡*/
      _handleClickContent() {
      },
      _handleClickShadowWrapper() {
        this.currentShow = false
      },
      _handleConfirm() {
        let ret = [];
        if (!!this.filterData && !!this.filterData.options) {
          this.filterData.options.forEach((item) => {
            if (item._isChecked)
              ret.push(item)
          })
        }
        this.$emit('confirm', {
          filterData: this.filterData,
          checkedOptions: ret
        })
        this.currentShow = false
      },
      _handleReset() {
        if (!!this.filterData && !!this.filterData.options) {
          this.filterData.options.forEach((item) => {
            item._isChecked = false
          })
          this.__updateView()
        }
      },
      _handleClickOptionItem(item, index) {
        item._isChecked = !item._isChecked
        this.__updateView()
      },
      __updateView() {
        /*改变数组长度，触发视图更新*/
        if (!!this.filterData && !!this.filterData.options) {
          this.filterData.options.push({})
          this.filterData.options.pop()
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/variables";

  .filter-tab{
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    .text-wrapper{
      position: relative;
      .text{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        .lnk-icon{
          margin-left: 6px;
          transition: all 0.4s;
        }
      }
    }
    .shadow-wrapper{
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      font-size: 14px;
      letter-spacing: 1px;
      .content{
        position: relative;
        background-color: white;
        border-top: $border;
        .option-list{
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .option-item{
            width: 50vw;
            box-sizing: border-box;
            margin-bottom: 12px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0 48px 0 24px;
            .name{
              height: 20px;
            }
            &:nth-child(1),&:nth-child(2){
              padding-top: 12px;
            }
            &.active-option{
              color: $vip-color !important;
            }
          }
        }
        .btn-wrapper{
          width: 100%;
          display: flex;
          flex-direction: row;
          .btn{
            width: 50%;
            padding: 12px 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            &.reset{
              border-top: $vip-color 0.5px solid;
              border-bottom: $vip-color 0.5px solid;
              color: $vip-color;
            }
            &.confirm{
              background-color: $vip-color;
              color: white;
            }
          }
        }
      }
    }
    &.active{
      .text-wrapper{
        .text{
          color: $vip-color;
          .lnk-icon{
            transform: rotate(180deg);
          }
        }
      }
      .shadow-wrapper{
        display: block;
        z-index: 100;
      }
    }
  }

</style>
