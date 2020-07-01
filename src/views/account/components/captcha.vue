<template>
    <div>
        <img :src="captchaUrl+query" alt="" height="30" class="fl">
        <i class="el-icon-refresh-right" @click="refreshCaptcha" />
    </div>
</template>

<script>
export default {
    data(){
        return{
            captchaUrl:process.env.VUE_APP_BASE_API+"/captcha",
            query:"?t="+Date.now()
        }
    },
    methods: {
        refreshCaptcha(){
            this.query = "?t="+Date.now();
        }
    },
}
</script>