<template>
    <div>
        <login v-if="showid==1" @switch="switchBox"></login>
        <register v-else-if="showid==2" @switch="switchBox"></register>
        <getpwd v-else-if="showid==3" @switch="switchBox"></getpwd>

        
        <el-button-group class="account-btn">
        <el-button size="mini" icon="el-icon-sort" @click="switchBg">切换背景</el-button>
        <el-button size="mini" icon="el-icon-lock" @click="lockBg">锁定背景</el-button>
        <el-button size="mini" icon="el-icon-close" @click="unlockBg" :disabled="disabled">取消锁定</el-button>
        </el-button-group>
    </div>
</template>

<script>
import login from './components/login'
import register from './components/register'
import getpwd from './components/getpwd'
import { getbingbg } from '@/api/users'

let bgKey = "bg";

export default {
    data(){
        return {
            showid: 1,
            bg: "",
            disabled: true
        }
    },
    components:{
        login,
        register,
        getpwd
    },
    created() {
        let bg = window.localStorage.getItem(bgKey);
        if(bg){
            this.bg = bg;
            document.body.style.background=`url(${bg})`;
            this.disabled = false;
        }else{
            this.getBg();
        }
    },
    methods:{
        switchBox(showid){
            this.showid = showid;
        },
        getBg(){
            getbingbg().then(res=>{
                this.bg = res.data;
                document.body.style.background=`url(${this.bg})`;
            })
        },
        switchBg(){
            this.getBg();
        },
        lockBg(){
            window.localStorage.setItem(bgKey, this.bg);
            this.disabled = false;
            this.$message.success("锁定成功");
        },
        unlockBg(){
            window.localStorage.removeItem(bgKey);
            this.disabled = true;
            this.getBg();
            this.$message.success("取消成功");
        }
    }
}
</script>