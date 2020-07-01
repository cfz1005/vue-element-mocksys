<template>
    <div class="account-box">
        <div class="tit">找回密码</div>
        <el-form :model="formData" :rules="rules" ref="form">
            <el-form-item prop="username">
                <el-input type="text" placeholder="邮箱" v-model="formData.username" maxlength="30">
                    <template v-slot:prepend>邮箱</template>
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
                    <a href="javascript:;" @click="$emit('switch',1)">再试试登录</a>
                </div>
                <div class="fr">
                    <!-- <el-button @click="$emit('switch',1)">注册</el-button> -->
                    <el-button type="primary" @click="submit" :loading="loading">发送</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
import captcha from './captcha'
import { getpwd } from '@/api/users'
export default {
    data(){
        return {
            loading:false,
            formData:{
                username:"",
                captcha:""
            },
            rules:{
                username:[
                    {required:true,message:"请输入邮箱地址",trigger:"blur"},
                    {type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}
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
                    getpwd(self.formData)
                    .then((res)=>{
                        self.loading = false;
                        if(res.code == 200){
                            // self.$router.replace("/account");
                            self.$confirm("新密码已经发送到你邮箱，请查收~","成功找回密码",{
                                confirmButtonText: '前往邮箱',
                                cancelButtonText: '马上登录',
                                type: 'success',
                                center: true,
                                showClose:false,
                                closeOnClickModal:false,
                                closeOnPressEscape:false,
                            })
                            .then(()=>{
                                let url = self.formData.username;
                                url = url.replace(/(\S*)@/, "mail.");
                                window.open("http://" + url, "_blank");
                                this.$emit("switch",1);
                            })
                            .catch(()=>{
                                this.$emit("switch",1);
                            });
                        }else{
                            self.loading = false;
                            self.$message.error(res.message);
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
