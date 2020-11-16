<template>
    <div class="account-box2">
        <!-- <div class="tit">修改密码</div> -->
        <el-form :model="formData" :rules="rules" ref="form">
            <el-form-item prop="old_password">
                <el-input type="password" placeholder="原密码" v-model="formData.old_password" maxlength="30">
                    <template v-slot:prepend><i class="el-icon-user" /></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="new_password">
                <el-input type="password" placeholder="新密码" v-model="formData.new_password" maxlength="15">
                    <template v-slot:prepend><i class="el-icon-lock" /></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="new_password2">
                <el-input type="password" placeholder="确认新密码" v-model="formData.new_password2" maxlength="15">
                    <template v-slot:prepend><i class="el-icon-lock" /></template>
                </el-input>
            </el-form-item>
            <el-form-item class="bottom" style="text-align:center;">
                <el-button type="primary" icon="el-icon-check" @click="submit" @keyup.enter.native="submit" :loading="loading">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
import { updatepwd } from '@/api/users'
import { mapState } from 'vuex'
export default {
    data(){        
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入确认新密码'));
            } else if (value !== this.formData.new_password) {
                callback(new Error('两次输入的新密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            loading:false,
            formData:{
                old_password:"",
                new_password:"",
                new_password2:""
            },
            rules:{
                old_password:[
                    {required:true,message:"请输入原密码",trigger:"blur"}
                ],
                new_password:[
                    {required:true,message:"请输入新密码",trigger:"blur"},
                    {min:6,max:15,message:"6-15个字符",trigger:["blur","change"]}
                ],
                new_password2:[
                    {required:true,validator: validatePass2,trigger:"blur"},
                    {min:6,max:15,message:"6-15个字符",trigger:["blur","change"]}
                ]
            }
        }
    },
    computed: {
        ...mapState(["userinfo"])
    },
    methods:{
        submit(){
            let self = this;
            this.$refs.form.validate(valid=>{
                if(valid){
                   self.loading = true;
                   updatepwd({...self.formData, username:self.userinfo.username})
                   .then(res=>{
                        self.$message.success("修改成功，请退出重新登录");
                        setTimeout(() => {
                            self.$store.dispatch("logout");
                            location.href = "/#/account";
                        }, 1500);
                   }).catch(err=>{
                        self.loading = false;
                        self.$message.error(err);
                   });
                }else{
                    return false;
                }
            });
        }
    }
}
</script>
