<template>
    <div class="navbar">
        <div class="left-menu left-logo"><a href="/"><img src="../../../assets/logo.png" alt=""></a></div>
        <el-menu
            class="el-menu-demo left-menu"
            :router="true"
            :default-active="$route.path"
            mode="horizontal"
            @select="handleSelect"
            background-color="#42b983"
            text-color="#fff"
            active-text-color="#2c3e50">
            <el-menu-item index="/my">我的项目</el-menu-item>
            <el-menu-item index="/team">团队项目</el-menu-item>
            <el-menu-item><a href="https://www.mocksys.com/docs" target="_blank">使用文档</a></el-menu-item>
            <el-menu-item><a href="https://github.com/cfz1005/vue-element-mocksys" target="_blank">Github</a></el-menu-item>
        </el-menu>
        
        <el-dropdown class="right-menu" @command="handleCommand">
            <div class="avatar-wrapper">
                <img :src="userinfo.avatar" class="user-avatar">
                <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command="info">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item> -->
                <el-dropdown-item command="update_pwd">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="right-un">
            {{userinfo.nickname}}，欢迎回来
        </div>


        <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
            <updatepwd></updatepwd>
        </el-dialog>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import updatepwd from '../../account/components/updatepwd'
export default {
    data(){
        return {
            dialogVisible:false
        }
    },
    components:{
        updatepwd
    },
    computed: {
        ...mapState(["userinfo"])
    },
    created() {
        this.$store.dispatch("getUserInfo");
    },
    methods:{
        handleSelect(){

        },
        handleCommand(command){
            if(command === "update_pwd"){
                this.dialogVisible = true;
            }
            else if(command === "logout"){
                this.$confirm("确定退出系统吗？","提示",{closeOnClickModal:false})
                .then(()=>{
                    this.$store.dispatch("logout")
                    // this.$router.replace("/account");
                    location.href = "/#/account";
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .navbar{
        background:#42b983;
        height: 60px;
        overflow: hidden;
        box-shadow:0 5px 10px rgba(0,0,0,.2);
    }
    .left-logo{
        // display: none;
        margin:8px 15px 0 15px;
    }
    .left-menu{
        float: left;
        height:100%;
    }
    .right-menu{
        float: right;
        height:100%;
        margin-right:30px;
        
        .avatar-wrapper {
        margin-top: 10px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .right-un{
        float:right;
        margin-right:15px;
        height: 100%;
        line-height: 60px;
        color:#fff;
    }
</style>