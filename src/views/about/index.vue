<template>
  <div class="home">
    <home-header></home-header>
    <div class="home-container">
      <el-row class="row1">
          <el-col :span="24">
            <h3>关于我们</h3>
            <p>目前<code>MockSys</code>项目由个人开发和维护，纯属个人兴趣和内部团队需要。</p>
            <p>本项目可以给你(你的团队)提供接口数据模拟服务，希望在开发的道路上对你有一点点的帮助。</p>
            <p>本项目是通过Vue.js、Mock.js、Element UI、Node.js 聚合而成，在此鸣谢。</p>
            <p>GitHub仓库：</p>
            <p>mocksys-client: 前端仓库 <a href="https://github.com/cfz1005/vue-element-mocksys" target="_blank">→传送门</a></p>
            <p>mocksys-server: 服务端仓库 <a href="https://github.com/cfz1005/vue-element-mocksys-server" target="_blank">→传送门</a></p>
            <p>使用过程也欢迎沟通交流，提供宝贵意见！</p>
            <p>注：本项目接口没有做任何的XSS等安全性检测，请勿在生产环境下使用！！</p>
            <p><img src="../../assets/wx.jpg" alt="" width="150"></p>
          </el-col>
      </el-row>
    </div>
    <home-footer></home-footer>
  </div>
</template>

<script>
import homeHeader from "../home/components/home-header";
import homeFooter from '../home/components/home-footer'
export default {
  data() {
    return {
    };
  },
  components: {
    homeHeader,
    homeFooter
  },
  created() {
      
  },
};
</script>