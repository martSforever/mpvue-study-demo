import Vue from 'vue'
import App from './App'
import 'src/common/prototype'
import MpvueRouterPatchInterceptor from "./common/mpvue-router-patch-interceptor";
import {every, match} from "./common/router-interceptors";

Vue.config.productionTip = false;
Vue.use(MpvueRouterPatchInterceptor, {every, match});

const app = new Vue(App);
app.$mount();

export default {
  config: {
    pages: ['^pages/example/style'],
    window: {
      "backgroundTextStyle": "black",
      "navigationBarBackgroundColor": "white",
      "navigationBarTitleText": "mpvue学习demo",
      "navigationBarTextStyle": "black"
    },
  }
}
