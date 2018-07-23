# mpvue-study-demo

> mpvue学习实例工程

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

没有翻墙软件的同学，使用npm安装项目依赖可能会有点慢，可以安装使用淘宝镜像安装npm依赖，需要先安装cnpm

``` bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

后续可以使用cnpm代替npm安装依赖了，比如

``` bash
cnpm install
```

*使用idea开发的同学，在将代码pull下来之后，先在根目录下创建两个文件夹，一个是node_modules，一个dist，
然后右击文件夹，将文件夹排除，make directory as -->> exclude， 再安装npm依赖，否则idea再文件扫描的时候会去
扫描node_modules目录下的文件，导致项目卡死，dist目录则是开发的时候不想要关注的内容* 


## 2、环境配置
1. 在package.json文件的启动脚本中，通过指定cross-env env=[ENV] 的方式指定了启动的环境，
对应着src/env目录下的环境配置文件，
其中env.public.js文件中存放公共的环境配置；

```$xslt
"scripts": {
    "dev": "cross-env env=dev release=false node build/dev-server.js",
    "uat": "cross-env env=uat release=false node build/dev-server.js",
    "start": "node build/dev-server.js",
    "dev-release": "cross-env env=dev release=true node build/build.js",
    "uat-release": "cross-env env=uat release=true node build/build.js"
  },
```

2. 在env.public.js文件中，通过设置remote的boolean值，可以设置当前开发是本地调试（连接本地后台java服务器），
还是远程调试（连接远程java服务器）；
3. 如果是打包模式，执行

``` bash
npm run dev-release
```

会打包开发环境的小程序代码，并且强制使用远程ip，就是在各个环境配置文件【env.[ENV].js】中配置的ip地址，
而不是使用env.public.js中配置的本地ip地址，remote选项将无视处理

## 3、目录说明
- /src
1. assets：存放资源文件、css样式、图片等；
2. common：存放公共的文件；
3. component：存放vue组件，其中基础组件放在子目录base中，业务组件放在子目录bus中，其中基础组件没有特别的样式，
可以存在于各个模块中，业务组件拥有特定的行为，比如跳转、查询数据等业务行为，可能存在于各个模块页面中；第三种具体组件，
只存在某个具体的页面或者模块中，存放在各个模块下的component文件夹下，比如/src/pages/home/component文件夹；
4. env：环境配置文件存放目录；
5. libs：外部依赖存放目录，小程序无法引入网络资源文件，比如css、js等，必须本地引入，这些文件就存放在该目录下；
6. pages：页面文件，由于引入了mpvue-entry依赖库，在编译打包的时候，会自动读取src/pages.js文件中的内容，会给里面配置
的vue组件生成小程序页面，所以pages目录下的页面组件就无需创建main.js文件；

## 4、样式绑定开发规范
- mpvue的template工程自带有px2rpx-loader编译器，px2rpx-loader会自动将得到的css中的px数值转换为
rpx数组（px=2rpx），所以为了统一规范，在scss文件以及在vue的style节点中，编写的样式统一使用px作为单位，
需要注意的是，750rpx为屏幕宽度，所以375px为屏幕宽度；
- 如果是针对横向的，大多数情况下请使用px单位，每个页面的内边距为24px，如果是针对纵向的，请使用vh单位，
100vh为屏幕高度，比如有的页面，顶部为tabbar，内容为scroll-view，而scroll-view必须指定一个高度，这时就可以设置顶部tabbar
高度为7vh，scroll-view为93vh，或者说是其他数值；
- 如果宽高是计算属性，请使用src/common/css.js中的styles函数，styles函数会自动将px数值转换为rpx（px=2rpx）

```
<div :style="computedStyles"></div>

computed:{
  computedStyles(){
      return styles({
        width:'100px'
      })
  },
}
```

- 还有一种情况,如果是在节点上使用style样式的，最好使用rpx单位，否者如果使用px单位，这种情况不会做任何处理
在不同分辨率设备上的显示的效果是不一样的
```
<div style="margin-bottom: 24rpx"></div>
```




