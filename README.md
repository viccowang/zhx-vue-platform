# 中航讯 前端基础框架 zhx-vue-plateform
#### Author:Vicco Wang / Date: 2018.04.20 / ver:1.2
---

## 开发与打包
> 目前只有`admin`后端业务系统,`client`端与`Server`端暂未进行开发

``` bash
# git clone
git clone 项目至本地

# 下载依赖文件
npm install

# 启动后台管理服务 地址为 localhost:8090
npm run dev:admin

# 启动前台SPA网页 地址为 localhost:8080
npm run dev:client

# 生产环境打包分析请使用以下命令
# 后台管理
npm run analyz:admin
# 前台SPA
npm run analyz:client

# 生产环境打包使用
# 后台管理
npm run build:admin
# 前台SPA
npm run build:client
```
---

---
## 更新记录

### Ver 1.3 2018.05.07
- 新增组件 Video
- 新增远程路由表与静态路由表切换功能,提供权限划分
- 调整了部分代码结构与命名

### Ver 1.2 2018.04.20
#### 更新
- 新增组件contextmenu
- 完善了Dashboad
- navTabs新增了右键功能
- 更新了当前平台的所有示例与目录结构,使之更加清晰
- 更新了配套文档

### Ver 1.1 2018.04.02
#### 修复
- 重构了NextPage部分功能,修复了诸多Bug
- 完善了路由表
- 完善了HTTP请求服务
- 完善了Layout布局


### Ver 1.0 2018.03.01
#### 新增
- 基础框架by Vue Cli
- ElementUI框架
- NextPage等自定义插件
