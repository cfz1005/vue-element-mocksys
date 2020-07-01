<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in projectList" :key="item.id" @click.native="itemClick(item.projectid)">
                <el-card  class="el-card">
                    <div slot="header" class="tit">
                        <i class="el-icon-notebook-1" /> <span>{{item.project_name}}</span>
                    </div>
                    <div>
                        <div class="info">{{item.project_desc}}</div>
                        <div class="ulog"><i class="el-icon-s-custom" /> <span>{{item.logs.nickname}}</span> <span class="fr">{{setLogDate(new Date(item.logs.addtime).getTime())}}</span></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        
        <no-data-tip v-if="notFound" msg="你还没加入任何项目哦~"></no-data-tip>
        
    </div>
</template>

<script>
import { getTeamList } from '@/api/project'
import { getDateDiff,formatDateTime } from '@/utils/tools'
import noDataTip from './components/nodata-tip'
export default {
    data(){
        return {
            projectList: [],
            notFound: false
        }
    },
    components:{
        noDataTip
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
            getTeamList()
            .then(res=>{
                self.projectList = res.data;
                !self.projectList.length && (self.notFound = true);
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
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/styles/mylist";
</style>
