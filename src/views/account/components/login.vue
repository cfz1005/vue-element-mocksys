<template>
    <div class="account-box">
        <div class="tit">登陆</div>
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
                    <el-button type="primary" icon="el-icon-check" @click="submit" :loading="loading">登录</el-button>
                </div>
            </el-form-item>
        </el-form>
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
