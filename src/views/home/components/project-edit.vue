<template>
    <div>
        <el-dialog title="编辑项目" :visible.sync="visible" width="600px" :close-on-click-modal="false" :before-close="closeDialog">
            <el-tabs type="card" v-model="tabs_select">
                <el-tab-pane label="基础信息" name="base">
                    <edit-base ref="editBase" v-if="tabs_select=='base'" :id="id" :baseinfo="projectBaseInfo" @close="closeDialog" @refresh="updateBaseInfo"></edit-base>
                </el-tab-pane>
                <el-tab-pane label="成员管理" name="member">
                    <edit-member ref="editMember" v-if="tabs_select=='member'" :id="id" :members="projectMembers" @close="closeDialog" @refresh="updateMembers"></edit-member>
                </el-tab-pane>
                <el-tab-pane label="转让" name="transfer">
                    <edit-transfer ref="editTransfer" v-if="tabs_select=='transfer'" :id="id" @close="closeDialog"></edit-transfer>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import editBase from './project-edit-base'
import editMember from './project-edit-member'
import editTransfer from "./project-edit-transfer";
import { getModelById } from '@/api/project'
export default {
    data(){
        return {
            tabs_select:"",
            projectBaseInfo:{},
            projectMembers:[]
        }
    },
    props:{
        visible:{
            type:Boolean,
            default:false
        },
        id:{
            type:Number
        }
    },
    components:{
        editBase,
        editMember,
        editTransfer
    },
    created() {
       this.getModel();
    },
    methods:{
        closeDialog(refresh = false){
            this.$emit("update:visible",false);
            this.tabs_select = "";

            refresh && this.$emit("refresh");
        },
        // 打开时候默认选中的项
        openCallBack(){
            this.tabs_select="base";
        },
        getModel(){
            getModelById(this.id)
            .then(res=>{
                const { code, data, message } = res;
                if(code == 200){
                    this.projectBaseInfo = data.project;
                    this.projectMembers = data.member;
                    this.openCallBack();
                }else{
                    console.log(message);
                }
            })
            .catch(err=>{
                console.log(err);
            });
        },
        updateBaseInfo(baseinfo){
            this.projectBaseInfo = baseinfo;
        },
        updateMembers({type,data}){
            if(type=="add"){
                this.projectMembers.push(data);
            }else if(type == "delete"){
                const i = this.projectMembers.findIndex(item => item.uid == data);
                i != -1 && this.projectMembers.splice(i,1);
            }
        }
    }
}
</script>