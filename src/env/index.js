import publicEnv from 'src/env/env.public'
import devEnv from './env.dev'
import uatEnv from './env.uat'

let targetEnv;
switch (process.env.env) {
  case "dev":
    targetEnv = devEnv
    break;
  case 'uat':
    targetEnv = uatEnv
    break;
  default:
    throw new Error(`找不到当前环境-->>${process.env.env}`)
}

let finalEnv = Object.assign({}, publicEnv, targetEnv);

if (process.env.release == null)
  throw new Error("process.env.release不存在，请检查！")
else
  finalEnv.remote = !!process.env.release ? true : finalEnv.remote

finalEnv.mobile_ip = finalEnv.remote ? finalEnv.mobile_ip : finalEnv.local_mobile_ip
finalEnv.isRelease = process.env.release;

delete finalEnv.remote
delete finalEnv.local_mobile_ip

export default finalEnv

export function logEnv() {
  // console.log(`env-->>`, finalEnv);
  console.log('-----------------------------------------------------------')
  if (finalEnv.isRelease) {
    console.log(`打包压缩模式，强制使用远程ip,当前环境为：${finalEnv.envName}`)
    console.log(`远程IP地址-->>${finalEnv.mobile_ip}`)
  } else {
    console.log(`本地调试模式,当前环境为：${finalEnv.envName}`)
    console.log(`请求的IP地址-->>${finalEnv.mobile_ip}`)
  }
  console.log('-----------------------------------------------------------')
}
