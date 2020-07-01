<template>
    <div>
        <el-form :model="form_data" ref="form" :rules="rules">
            <el-form-item label="项目名称" prop="project_name">
                <el-input v-model="form_data.project_name" ref="project_name" placeholder="项目名称，3~20个字符以内" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item>
                <el-form-item label="项目描述" prop="project_desc">
                    <el-input v-model="form_data.project_desc" placeholder="项目描述，50个字符以内" maxlength="50"></el-input>
                </el-form-item>
            </el-form-item>
        </el-form>
        <div style="text-align:right;">
            <el-button type="" icon="el-icon-close" @click="$emit('close')" v-if="!id">取消</el-button>
            <el-button type="primary" icon="el-icon-check" @click="submit">提交</el-button>
        </div>
    </div>
</template>


<script>
import { add, update } from '@/api/project'
export default {
    data(){
        return {
            form_data:{
                project_name:"",
                project_desc:""
            },
            rules:{
                project_name: [
                    { required: true, message: "请输入项目名称", trigger: "blur"}, 
                    { min: 3, max: 20, message: "长度在 3~20 个字符", trigger: "blur"}
                ],
                project_desc:[]
            }
        }
    },
    props:{
        id:{
            type:Number,
            default:0
        },
        baseinfo:{
            type:Object
        }
    },
    created(){
        if(this.id){
            this.form_data.id = this.id; // 加入id字段
            this.baseinfo && (this.form_data = this.baseinfo);
        }
    },
    methods:{
        submit(){
            let self = this;
            this.$refs.form.validate(valid=>{
                if(valid){
                    let fun = !self.id ? add : update;
                    fun(self.form_data)
                    .then(res=>{
                        if(res.code == 200){
                            if(!self.id){
                                self.$message.success("创建成功");
                                self.$emit("close",true);
                                self.$refs.form.resetFields();
                            }else{
                                self.$message.success("修改成功");
                                self.$emit("refresh",self.form_data);
                            }
                        }else{
                            self.$message.error(res.message);
                        }
                    })
                    .catch(err=>{
                        (typeof err == "string") && self.$message.error(err);
                    });
                }else{
                    this.$refs.project_name.focus();
                    return false;
                }
            })
        }
    }
}
</script>