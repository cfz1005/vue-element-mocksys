<template>
    <div class="account-box">
        <div class="tit"><img src="../../../assets/logo.png" alt=""></div>
        <el-form :model="formData" :rules="rules" ref="form">
            <el-form-item prop="username">
                <el-input type="text" placeholder="邮箱" v-model="formData.username" maxlength="30">
                    <template v-slot:prepend><i class="el-icon-user" /></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="密码" v-model="formData.password" maxlength="15">
                    <template v-slot:prepend><i class="el-icon-lock" /></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="captcha" class="captcha">
                <el-input type="txt" placeholder="验证码" v-model="formData.captcha" minlength="4" maxlength="4">
                    <template v-slot:prepend><i class="el-icon-bell" /></template>
                    <template v-slot:append>
                        <captcha />
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="bottom">
                <div class="fl">
                    <a href="javascript:;" @click="$emit('switch',3)">忘记密码？</a>
                </div>
                <div class="fr">
                    <el-button @click="$emit('switch',2)">注册</el-button>
                    <el-button type="primary" icon="el-icon-check" @click="submit" @keyup.enter.native="submit" :loading="loading">登录</el-button>
                </div>
            </el-form-item>
        </el-form>
        <div class="sm">
            <p>本系统旨在为大前端开发者提供可用、高效的接口数据模拟服务，方便在服务端还未产出接口的情况下开发、调试以及效果演示，进而提高前后端分离开发的生产效率。</p>
            <div>
                <a href="https://www.mocksys.com/docs" target="_blank"><i class="el-icon-document"></i>使用文档</a>
                <a href="https://github.com/cfz1005/vue-element-mocksys" target="_blank" class="github">GitHub</a>
            </div>
        </div>
    </div>
</template>


<script>
import captcha from './captcha'
export default {
    data(){
        return {
            loading:false,
            formData:{
                username:"",
                password:"",
                captcha:""
            },
            rules:{
                username:[
                    {required:true,message:"请输入邮箱地址",trigger:"blur"},
                    {type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}
                ],
                password:[
                    {required:true,message:"请输入密码",trigger:"blur"}
                ],
                captcha:[
                    {required:true,message:"请输入验证码",trigger:"blur"}
                ]
            }
        }
    },
    components:{
        captcha
    },
    methods:{
        submit(){
            let self = this;
            this.$refs.form.validate(valid=>{
                if(valid){
                   self.loading = true;
                   self.$store.dispatch("login",self.formData)
                   .then(res=>{
                       if(res == true){
                           let { redirect } = this.$route.query;
                            if(redirect){
                                self.$router.replace(redirect);
                            } else{
                                self.$router.replace("/");
                            }
                       }else{
                            self.loading = false;
                            self.$message.error(res);
                       }
                   });
                }else{
                    return false;
                }
            });
        }
    }
}
</script>
