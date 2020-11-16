<template>
    <div>
        <template v-if="!notFound">
        <el-row class="project-info">
            <el-col :span="24">
                <div class="project-name">{{projectInfo.project_name}}</div>
                <div class="project-about">{{projectInfo.project_desc}}</div>
                <div>
                    <el-input :value="baseUrl + pid +'/:method/:url'" class="interface-addr">
                        <!-- <template #prepend>Base URL</template> -->
                        <template v-slot:prepend>接口格式1：</template>
                    </el-input>
                </div>
                <div>
                    <el-input :value="baseUrl + ':interfaceId'" class="interface-addr">
                        <!-- <template #prepend>Base URL</template> -->
                        <template v-slot:prepend>接口格式2：</template>
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row class="project-btns">
            <el-col :span="24">
                <el-button type="" icon="el-icon-back" @click="$router.go(-1)">返回</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="$router.replace('/project/'+pid+'/interface')" class="fr" v-if="role==1">新建接口</el-button>
            </el-col>
        </el-row>
        <el-row class="project-api">
            <el-col :span="24">
                <el-table border :data="tableData" :header-cell-style="{background:'#f3f5f7'}">
                    <el-table-column type="index" width="50" label="序号"></el-table-column>
                    <el-table-column prop="id" width="150" label="InterfaceId"></el-table-column>
                    <el-table-column label="Method" width="150">
                        <template v-slot="scope">
                            <el-tag :type="setMethodColor(scope.row.method)">{{scope.row.method}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="url" label="URL" width="280"></el-table-column>
                    <el-table-column prop="description" label="接口说明"></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template v-slot="scope">
                            <el-button-group>
                            <el-button size="mini" icon="el-icon-view" title="预览" @click="preview(scope.row.method,scope.row.url)"></el-button>
                            <el-button size="mini" icon="el-icon-link" title="复制链接" @click="copy(scope.row.method,scope.row.url)"></el-button>
                            <el-button size="mini" icon="el-icon-edit" title="编辑" @click="edit(scope.row.id)" v-if="role==1"></el-button>
                            <!-- <el-button size="mini" icon="el-icon-delete" title="删除" @click="remove(scope.row.id)"></el-button> -->
                            <el-popconfirm title="此操作不可恢复，确定要删除吗？" @onConfirm="remove(scope.row.id)" v-if="role==1">
                                <el-button slot="reference" size="mini" icon="el-icon-delete" title="删除"></el-button>
                            </el-popconfirm>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        </template>
        
        <no-data-tip v-else msg="喔噢，该项目不存在~"></no-data-tip>
        
    </div>
</template>

<script>
import { getProjectById } from '@/api/project'
import { remove } from '@/api/interface'
import { copyText } from '@/utils/tools'
import noDataTip from './components/nodata-tip'
export default {
    data(){
        return {
            baseUrl:process.env.VUE_APP_INTERFACE_BASE_URL,
            pid: this.$route.params.id,
            projectInfo: {},
            tableData: [],
            notFound: false
        }
    },
    components:{
        noDataTip
    },
    computed: {
        role(){
            return this.projectInfo.role;
        }
    },
    created(){
        this.getData();
    },
    methods: {
        getData(){
            getProjectById(this.pid)
            .then(res=>{
                const { code,data,message } = res;
                if(code === 200 && data){
                    this.projectInfo = data.project;
                    this.tableData = data.interface;
                } else{
                    this.notFound = true;
                    // this.$message.error(message);
                }
            })
            .catch(err=>{
                // this.notFound = true;
                this.$message.error(err);
            })
        },
        setMethodColor(method){
            method = method.toUpperCase();
            if(method == "GET"){
                return "success";
            } else if(method == "POST"){
                return "warning";
            } else if(method == "PUT"){
                return "info";
            } else if(method == "DELETE"){
                return "danger";
            }
        }, 
        preview(method,url){
            window.open(this.baseUrl + this.pid + "/" + method.toLowerCase() + "/" + url);
        },
        edit(id){
            this.$router.replace('/project/'+this.pid+'/interface/'+id)
        },
        copy(method,url){
            if(copyText(this.baseUrl + this.pid + "/" + method.toLowerCase() + "/" + url)){
                this.$message.success(`成功复制 /${method.toLowerCase()}/${url} 到剪贴板`);
            }else{
                this.$message.error("复制链接失败，请重试");
            }
        },
        remove(id){
            remove({id: id, projectid: this.pid})
            .then(res=>{
                const { code,data,message } = res;
                if(code === 200){
                    const i = this.tableData.findIndex(item => item.id == id);
                    i != -1 && this.tableData.splice(i,1);
                    this.$message.success("删除成功");
                } else{
                    this.$message.error(message);
                }
            })
            .catch(err=>{
                this.$message.error(err);
            });
        }
    },
}
</script>


<style lang="scss" scoped>
.project-info{
    background:#f3f5f7;
    border-radius: 5px;
    padding:15px;
    .project-name{
        font-size:16px;
    }
    .project-about{
        padding:10px 0;
        line-height: 1.7em;
        color:#999;
    }
    .el-input-group{
        margin:3px 0;
    }
}
.project-btns{
    margin-top:20px;
}
.project-api{
    background:#f3f5f7;
    margin-top:20px;
    .el-table--border{
        border:1px solid #ddd;
    }
}
</style>