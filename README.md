# MockSys-client
[MockSys](https://www.mocksys.com/)是一个数据接口模拟平台，旨在为大前端开发者提供可用、高效的接口数据模拟服务，方便在服务端还未产出接口的情况下开发、调试以及效果演示，进而提高前后端分离开发的生产效率。

本项目分为前台和服务端2个子项目：
* MockSys-client：前台基于Vue [传送门](https://github.com/cfz1005/vue-element-mocksys)
* MockSys-server：服务端基于Koa2 + Mysql + Redis [传送门](https://github.com/cfz1005/vue-element-mocksys-server)

本项目开源 & 完全免费~

目前[MockSys](https://www.mocksys.com/)平台由个人开发和维护，当前还较为粗糙，使用过程如有问题欢迎沟通交流，提供宝贵意见，谢谢！

**注意：本项目接口没有做任何的XSS等安全性检测，请勿在生产环境下使用！！**

|加我微信|
|:--:|
|cfz1005|




## 初始化 安装项目依赖
```
npm install
```

### 开发模式
```
npm run serve
```

### 生产模式
```
npm run build
```

### 生产模式（测试环境）
```
npm run build-test
```
