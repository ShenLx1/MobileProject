# 移动端项目
1. 使用模板，建立项目
1. 制作首页app组件
    1. 使用[mintui](http://mint-ui.github.io/)组件来制作header
    1. 使用[mui](http://dev.dcloud.net.cn/mui/)制作tabbar
    1. 中间放置roter-view使用路由匹配到组件
1. 改造tabbar为router-link
    1. 设置路由高亮
    1. 跳转对应路由组件
1. 制作首页轮播图布局
    - 加载首页轮播图数据（vue-resource）
    `npm install vue-resource -s`
    1. 使用VueResource获取数据 
    1. 使用VueResource得this.$http.get获取接口数据
    1. 将数据保存到data上
    1. 使用v-for循环每个item项
    - 九宫格区域
1. 增加动画
1. 制作新闻界面
    1. 改造新闻路由连接（media-list）
    1. 使用vue-resourse获取数据
    1. 渲染真实数据
    1. 定义全局过滤器，来统一格式化时间
        使用moment组件`npm install moment -s`
    1. 新闻详情
        1. 把列表里面每一项改造为router-link，同时提供唯一id标识符
        1. 创建详情组件
        1. 在 路由模块 中将新闻详情的 路由地址 和 组件页面 对应起来
1. 单独封装一个comment评论子组件
    1. 先创建一个评论组件模板
        1. 需要使用时，手动导入comment组件 `import comment from './comment.vue'`
        1. 在父组件中，使用`components`属性。将刚才导入的comment组件注册为子组件
        1. 使用时，当作标签引用即可
    1. 加载更多评论
        1. 点击按钮，绑定事件，重新请求数据
        1. 让请求页数+1
    1. 发布评论
        1. 对文本框做双向绑定
        1. 为发表按钮绑定事件
        1. 评论校验判空
        1. 通过vue-resource发送数据到服务器
        1. 重新加载列表
        + 正常评论排序为事件正序，为了不让用户要到末尾才看到自己发布的评论
        + 在客户端，手动拼接出一个客户端评论对象追加到data的最前面，这样就不同重新加载数据


## 图片分享
1. 使用mui的tab-top-webview-main顶部导航条
    1. 去除full-screen属性
    1. 导入mui.js来初始化这个控件（官网）
    1. 导入时报错
    ```js
    Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
    ```
    + 是mui中使用了这三项，webpack打包时默认启用了严格模式，产生了冲突
        1. 把mui.js中的非严格模式代码去除
        1. 把webpack严格模式禁用
             - 使用`babel-plugin-transform-remove-strict-mode`插件
             `npm install babel-plugin-transform-remove-strict-mode -D`
             - 在`.babel`中的plugins里添加配置`"plugins": ["transform-remove-strict-mode"]`
    1. 刚进去页面无法滑动，刷新页面才行
        1. 初始渲染画布的时候vue元素还没有挂载到页面上
        1. 在最早能执行dom元素操作的mounted方法来加载滚动画布
        ```js
            mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        ```
    1. 滑动时报错
    ```js
    [Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive.
    ```
        - 这是chrome为了提高页面滑动流畅度的设置
        - 通过添加属性`* {touch-action: pan-y;}`来消除
    1. tabber无法操作
        - 属性`mui-tab-item`发生冲突
    1. vue绑定类选择器 
    `<a :class="['mui-control-item',item.id==0?'mui-active':'']">`     
1. 按类别加载图片
使用Mint-ui的`lazy-load`懒加载[需要全部引用]
改造li成routelink时需要用tag标签渲染为li
- **注意事项**
    1. promise通过.then执行下一步。同时要加上.catch抓住报错（虽然只是让报错不显示为报错）    
    1. webpack跨域。通过配置proxy

1. 缩略图制作
    - 使用`vue-preview`插件


 ## 商品列表功能页 

- 加入购物车
    - 小球动画
    - vuex传值到购物车组件
    - 徽标数值自动更新
    - 刷新会重置，需要存储到本地localstorage实现持久化

    - 通过接口获取商品信息，在购物车获取商品数量
        - 先创建一个空对象，然后循环购物车中所有商品，把商品id作为属性名，count作为属性值
    - 购物车修改数量时，同步到store
    - 通过hgetters 设置数量和总价
 ## 在手机上调试程序  


 ##vuex
 vuex 的作用是：保存组件之间共享的数据
 不需要再通过父子组件传值
 （私有数据还是放在data中）
（props，data，vuex）
- 安装 
    1. npm install vuex --save
    2. import Vue from 'vue'
       import Vuex from 'vuex'
       Vue.use(Vuex)
    3. 创建仓储store
    const store =new Vuex.store({
        state:{//类似于data
            count:0
        },
        mutations:{//类似于methods
            increment(state){
                state.count++
            }
        }
    })
    4. 加载到vm实例 store:store
    这样每个组件就可以全局访问
- 取值 this.$store.state.***
- 操作
    - 不推荐直接操作数据，因为每个组件都可以对其经行操作，出错了会数据紊乱
    - 应该通过电泳mutations中提供的方法来操作数据  
        - this.$store.commit('方法名',参数)
        - mutations中方法最多两个参数【1.state状态】【2.commit过来的参数】。coimmit调用时一个方法名，一个参数（可以传对象）
- getters 封装数据
    - getters:{//只负责对外提供数据，不可修改数据
        optCount:function(status){
            return '当前最新的数据是：'+state.count
        }
    }
    - 从return数据角度看，和过滤器filter相像（对源数据进行包装，提供给使用者）
    - 从特性上看，和计算属性computed类似（只要数据发送变化，就重新求值）


## webpack 打包程序
- 需要安装webpack-cli
npm install  webpack-cli -g