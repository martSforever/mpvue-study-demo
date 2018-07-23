/*
*   power by    weishengjian
*   datetime    2018/7/14 10:29
*   desc:       封装微信数据请求，返回Promise对象，以便使用async/await方式请求数据
*/

import env from '../env/index'
import {showModal} from "./msg";

export function httpGet(url, param) {
  return request(url, param, 'GET');
}

export function httpPost(url, param) {
  return request(url, param, 'POST');
}


function request(url, param, method) {
  return new Promise((rs, rj) => {
    wx.request({
      url: env.mobile_ip + '/' + url,
      data: param,
      method: method,
      success(resp) {
        let state = resp.data
        if (state.code === env.success_code) {
          defaultSuccessHandler(rs, state.data);
        } else {
          defaultErrorHandler(rj, resp);
        }
      },
      fail(error) {
        defaultErrorHandler(rj, error);
      },
    });
  })
}

function defaultErrorHandler(rj, error) {
  let errMsg = JSON.stringify(error)
  showModal(errMsg, {
    title: '请求失败'
  })
  console.error('reject-->>', errMsg);
  rj(error);
}

function defaultSuccessHandler(rs, data) {
  rs(data);
}

export async function testHttp() {
  let data = await httpGet('weapp/demo', {id: '123'})
  console.log('测试请求本地后台数据-->>', data);
}
