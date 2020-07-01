<template>
  <div>
    <home-header></home-header>
    <div style="text-align:center;margin-top:50px;">
      <div style="font-size:60px;">404 . Not Found</div>
      <p>没有找到你要的内容！</p>
    </div>
  </div>
</template>

<script>
import homeHeader from "../home/components/home-header";
export default {
  data() {
    return {
    };
  },
  components: {
    homeHeader
  },
  created() {
      document.body.style.background=`#e1e4e8`;
  },
};
</script>