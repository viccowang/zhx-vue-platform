## Nextpage 使用指南
#### Author: Vicco Wang
#### Date: 2018.03.20
#### Ver: 1.12
----

### Nextpage 功能介绍
- Nextpage用于在同一容器内打开多个有层叠级别关系的页面.
- 打开页面不会触发路由变化.
- 通过Vue的`KeepAlive`实现缓存,因此理论上可以无线层级的嵌套
- 目前版本仅支持在当前平台上使用,因为使用了`Vuex`来获取一些信息,来实现自动注销事件


### 在全局`main.js`中加载依赖
**注意,NextPage插件必须依赖路由`router`以及`Vuex store`才能工作 **
```js
import NextPage from '@/components/Nextpage/'

Vue.use(NextPage, { router, store })
```

### 在组件中使用Nextpage
因为组件在全局注册了,所以在每一个Vue实例上都会挂载 `$nextPage()`方法.
```js
this.$nextPage(options)
```

### Nextpage Options
|  参数名称   |   类型    |  value                  |
| :-------: | :---------:| :-----                |
| title     |  String    |  打开页面的标题 |
| props     |  Object    |  需要传递给下一级Nextpage的参数,下一级Nextpage接收参数也是通过 props 接收,和Vue组件一样 |
| component |  Vue Component | 需要通过Nextpage加载的组件, 该组件一般通过import引入进来 |


