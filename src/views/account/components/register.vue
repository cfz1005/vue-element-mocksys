<template>
    <div class="account-box">
        <div class="tit">注册</div>
        <el-form :model="formData" :rules="rules" ref="form">
            <el-form-item prop="nickname">
                <el-input type="text" placeholder="3-15个字符" v-model="formData.nickname" minlength="3" maxlength="15">
                    <template v-slot:prepend>昵称</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="username">
                <el-input type="text" placeholder="30个字符以内" v-model="formData.username" maxlength="30">
                    <template v-slot:prepend>邮箱</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="6-15个字符" v-model="formData.password" minlength="6" maxlength="15">
                    <template v-slot:prepend>密码</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="captcha" class="captcha">
                <el-input type="txt" placeholder="验证码" v-model="formData.captcha" minlength="4" maxlength="4">
                    <template v-slot:prepend>验证</template>
                    <template v-slot:append>
                        <captcha />
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="bottom">
                <div class="fl">
                    <a href="javascript:;" @click="$emit('switch',1)">已有账号，直接登录</a>
                </div>
                <div class="fr">
                    <!-- <el-button @click="$emit('switch',1)">取消</el-button> -->
                    <el-button type="primary" @click="submit" :loading="loading">提交</el-button>
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
                nickname:"",
                username:"",
                password:"",
                captcha:""
            },
            rules:{
                nickname:[
                    {required:true,message:"请输入昵称",trigger:"blur"},
                    {min:3,max:15,message:"3-15个字符",trigger:["blur","change"]}
                ],
                username:[
                    {required:true,message:"请输入邮箱地址",trigger:"blur"},
                    {type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}
                ],
                password:[
                    {required:true,message:"请输入密码",trigger:"blur"},
                    {min:6,max:15,message:"6-15个字符",trigger:["blur","change"]}
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
                    self.$store.dispatch("register",self.formData)
                    .then(res=>{
                        if(res == true){
                            self.$router.replace("/");
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
