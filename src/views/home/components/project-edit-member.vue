<template>
    <div>
        <div>
            <el-form :model="form_data" ref="form">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item prop="username">
                        <el-input ref="username" v-model="form_data.username" placeholder="请输入用户名" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="role">
                            <el-checkbox v-model="form_data.role">只读</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                        <el-button type="primary" size="mini" icon="el-icon-check" @click="add">添加</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        
        
        <el-table :data="datalist">
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column label="权限" width="100">
                <template v-slot="scope">
                    <!-- {{scope.row.role==1?'可读写':'只读'}} -->
                    <el-tag type="success" size="mini" v-if="scope.row.role==1">可读写</el-tag>
                    <el-tag type="info" size="mini" v-else>只读</el-tag>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="addtime" label="添加时间" width="160"></el-table-column> -->
            <el-table-column prop="addtime" label="添加时间" width="160">
                <template v-slot="scope">
                    {{formatAddTime(scope.row.addtime)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template v-slot="scope">
                    <!-- <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button> -->
                    <el-popconfirm title="确定要删除吗？" @onConfirm="remove(scope.row.uid)">
                        <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
import { addMember,removeMember } from '@/api/project'
import { formatDate } from '@/utils/tools'
export default {
    data(){
        return {
            form_data:{
                username:"",
                role:false,
            },
            datalist:[]
        }
    },
    props:{
        id:{
            type:Number,
            default:0
        },
        members:{
            type:Array
        }
    },
    created() {
        if(this.members){
            this.datalist = this.members;
        }
    },
    methods: {
        getData(){
        },
        formatAddTime(date){
            return formatDate(date);
        },
        add(){
            if(!this.form_data.username.trim()){
                this.$refs.username.focus();
                return false;
            }else{
                addMember({
                    id: this.id,
                    username: this.form_data.username,
                    role: !this.form_data.role ? 1 : 2
                    // ...this.form_data
                })
                .then(res=>{
                    const { code,message,data } = res;
                    if(code == 200){
                        this.$message.success("添加成功");
                        this.$refs.form.resetFields();
                        this.$emit("refresh",{
                                    type: "add",
                                    data: res.data
                                });
                    }else{
                        this.$message.error(message);
                        this.$refs.username.focus();
                    }
                })
                .catch(err=>{
                    this.$message.error(err);
                });
            }
        },
        remove(uid){
            removeMember({uid, projectid: this.id})
            .then(res=>{
                const { code,data,message } = res;
                if(code === 200){
                    // const i = this.datalist.findIndex(item => item.uid == uid);
                    // i != -1 && this.datalist.splice(i,1);
                    this.$message.success("删除成功");
                    this.$emit("refresh",{
                                type: "delete",
                                data: uid
                            });
                } else{
                    this.$message.error(message);
                }
            })
            .catch(err=>{
                this.$message.error(err);
            });
        }
    }
}
</script>