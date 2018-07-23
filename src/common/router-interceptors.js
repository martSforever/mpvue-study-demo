/*
*   power by    weishengjian
*   datetime    2018/7/14 10:32
*   desc:       页面跳转路由拦截器
*/

import {hideLoading, showLoading, showModal} from "./msg";
import {delay} from "./mpvue-router-patch-interceptor";

export let every = [
  async (option, next) => {
    console.log('1 start')
    showLoading()
    await delay(100)
    await next();
    hideLoading()
    console.log('1 end')
  },
  async (option, next) => {
    console.log('2 start')
    await delay(200)
    await next()
    console.log('2 end')
  },
  async (option, next) => {
    console.log('3 start')
    await delay(300)
    await next()
    console.log('3 end')
  }
]

export let match = {
  '/pages': [
    async (option, next) => {
      console.log('match /pages', option)
      next()
    }
  ],
  '/pages/dev': [
    async (option, next) => {
      console.log('match /pages/dev', option)
      if (option.query.name !== '111') {
        showModal('name 不为111');
      } else {
        next()
      }
    }
  ]
}
