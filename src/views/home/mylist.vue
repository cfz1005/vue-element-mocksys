<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card class="el-card">
                    <el-button class="btn-add" @click="showAddDialog">
                        <i class="el-icon-plus" />
                        <span>创建项目</span>
                    </el-button>
                </el-card>
            </el-col>
            <el-col :span="6" v-for="item in projectList" :key="item.id" @click.native="itemClick(item.id)">
                <el-card  class="el-card">
                    <div slot="header" class="tit">
                        <i class="el-icon-document"/> <span>{{item.project_name}}</span>
                        <a @click.stop="deleteProject(item.id)"><i class="el-icon-delete fr"></i></a>
                        <a @click.stop="showModifyDialog(item.id)"><i class="el-icon-edit fr"></i></a>
                    </div>
                    <div>
                        <div class="info">{{item.project_desc}}</div>
                        <div class="ulog"><i class="el-icon-s-custom" /> <span>{{item.logs.nickname}}</span> <span class="fr">{{setLogDate(new Date(item.logs.addtime).getTime())}}</span></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <add-dialog :visible.sync="addDialogVisible" @refresh="getData" v-if="addDialogVisible"></add-dialog>
        <edit-dialog :visible.sync="editDialogVisible" :id="edit_id" @refresh="getData" v-if="editDialogVisible"></edit-dialog>
    </div>
</template>

<script>
import addDialog from './components/project-add'
import editDialog from './components/project-edit'
import { getMyList, remove } from '@/api/project'
import { getDateDiff, formatDateTime } from '@/utils/tools'
export default {
    data(){
        return {
            projectList:[],
            addDialogVisible:false,
            editDialogVisible:false,
            edit_id:0
        }
    },
    components:{
        addDialog,
        editDialog,
    },
    created() {
        this.getData();
    },
    provide(){
        return {
            refreshList: this.getData
        }
    },
    methods:{
        getData(){
            let self = this;
            getMyList()
            .then(res=>{
                self.projectList = res.data;
            })
            .catch(err=>{
                self.$message.error(err);
            });
        },
        setLogDate(timeStamp){
            return getDateDiff(timeStamp);
        },

        itemClick(id){
            this.$router.push("/project/"+id);
        },
        showAddDialog(){
            this.addDialogVisible = true;
        },
        showModifyDialog(id){
            // console.log("...modify"+id);
            this.edit_id = id;
            this.editDialogVisible = true;
        },
        deleteProject(id){
            this.$confirm("确定要删除该项目吗？","提示")
            .then(()=>{
              remove({id})
              .then(res=>{
                  if(res.code == 200){
                    //   this.getData();
                    const i = this.projectList.findIndex(item=>item.id==id);
                    i != -1 && this.projectList.splice(i,1);
                    this.$message.success("删除成功");
                  }else{
                    this.$message.error(res.message);
                  }
              })
              .catch(err=>{
                  this.$message.error(err);
              });
            })
            .catch(()=>{ });
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/styles/mylist";
</style>
