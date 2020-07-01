<template>
    <div>
        <el-form :model="form_data" ref="form" :rules="rules">
            <el-form-item label="项目接收者用户名" prop="username">
                <el-input v-model="form_data.username" ref="project_name" placeholder="项目接收者用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-form-item label="你的登陆密码" prop="password">
                    <el-input type="password" v-model="form_data.password" placeholder="你的登陆密码"></el-input>
                </el-form-item>
            </el-form-item>
        </el-form>
        <div style="text-align:right;">
            <el-button type="primary" icon="el-icon-check" @click="submit">转让</el-button>
        </div>
    </div>
</template>


<script>
import { updateOwner } from '@/api/project'
export default {
    data(){
        return {
            form_data:{
                username:"",
                password:""
            },
            rules:{
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur"}
                ],
                password:[
                    { required: true, message: "请输入登陆密码", trigger: "blur"}
                ]
            }
        }
    },
    props:{
        id:{
            type:Number,
            default:0
        }
    },
    methods:{
        submit(){
            // console.log(this.$refs.form);
            this.$refs.form.validate(valid=>{
                if(valid){
                    updateOwner({
                        id: this.id,
                        to_username: this.form_data.username,
                        from_password: this.form_data.password
                    })
                    .then(res=>{
                        const {message,code} = res;
                        if(code == 200){
                            this.$emit("close", true);
                            this.$message.success("转让成功");
                        }else{
                            this.$message.error(message);
                        }
                    })
                    .catch(err=>{
                        this.$message.error(err);
                    })
                }else{
                    return false;
                }
            })
        }
    }
}
</script>