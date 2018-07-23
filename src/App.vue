<script>
  import {logEnv} from "./env";
  import {httpGet, httpPost, testHttp} from "./common/http";
  import {styles} from "./common/css";

  export default {
    name: "App",
    async created() {
      logEnv();
      // await testHttp();
    },
  }
</script>

<style lang="scss">
  @import "libs/iconfont/iconfont.css";
  @import "assets/css/global-css";

</style>
