<template>
    <div>

        <div class="project-info" v-if="!notFound">
            <el-row>
                <el-col :span="20" class="el-right">
                    <div class="tit">接口数据 <span>(JSON格式，<a href="http://mockjs.com/examples.html" target="_blank">支持mockjs数据模板</a>)</span> </div>
                    <json-editor :value="json_data" ref="jsonEditor"></json-editor>
                </el-col>

                <el-col :span="4" class="el-left">
                    <el-form :model="form_data" ref="form" :rules="rules">
                    <el-form-item label="Method" prop="method">
                        <el-select v-model="form_data.method" placeholder="请选择" style="width:100%;">
                            <el-option label="GET" value="GET"></el-option>
                            <el-option label="POST" value="POST"></el-option>
                            <el-option label="PUT" value="PUT"></el-option>
                            <el-option label="DELETE" value="DELETE"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="URL" prop="url">
                        <el-input placeholder="请输入URL" v-model="form_data.url">
                            <template v-slot:prepend>/</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="接口描述">
                        <el-input placeholder="接口描述,20个字符以内" v-model="form_data.description"></el-input>
                    </el-form-item>

                    <div class="btn">
                        <el-button type="primary" icon="el-icon-check"  style="width:100%" @click="submit">提交</el-button>
                    </div>
                    <div class="btn">                        
                        <el-button-group style="width:100%;">
                        <el-button style="width:50%;" icon="el-icon-tickets" title="格式化" @click="formatJson">格式化</el-button>
                        <el-button style="width:50%;" icon="el-icon-close" title="返回" @click="goback">关闭</el-button>
                        </el-button-group>
                    </div>
                    </el-form>
                </el-col>
            </el-row>
        </div>

        <no-data-tip v-else msg="喔噢，该接口不存在~"></no-data-tip>

    </div>
</template>


<script>
import jsonEditor from '@/components/json-editor'
import noDataTip from './components/nodata-tip'
import { add,update,getModelById } from '@/api/interface'
export default {
    data(){
        // 自定义验证
        let checkUrl = (rule,value,callback)=>{
            if(/(?!-)\W/.test(value)){
                return callback(new Error("含有非法字符"));
            }
            callback();
        };
        return {
            notFound: false,
            json_data:{},
            form_data:{
                projectid: this.$route.params.pid,
                url: "",
                method: "",
                description: ""
            },
            rules:{
                method:[
                    {required:true, message: "请选择一个Method",trigger:"change"}
                ],
                url:[
                    {required:true,message:"请输入url",trigger:"blur"},
                    {min:3,max:20,message:"长度在 3~20 个字符",trigger:"blur"},
                    {validator:checkUrl,trigger:"blur"}
                ]
            }
        }
    },
    components:{
        jsonEditor,
        noDataTip
    },
    created(){
        if(this.$route.params.iid){
            this.form_data.id = this.$route.params.iid;
            this.getModel();
        }else{
            this.json_data = {
                "code":200,
                "message":"success",
                "data|1-5":[
                    {
                        "id":"@id()",
                        "title|1-3":"@cname()★ ",
                        "content":"@cparagraph(1,5)",
                        "date": "@date()",
                        "avatar": "@image('100x100','red','#fff','avatar')",
                        "ip": "@ip()",
                        "email": "@email()"
                    }
                ]
            };
        }
    },
    methods:{
        formatJson(){
            // console.log(this.$refs.jsonEditor.getValue());
            this.$refs.jsonEditor.format();
        },        
        getModel(){
            let res = getModelById(this.$route.params.iid)
            .then(res=>{
                let { code,message,data } = res;
                if(code == 200){
                    this.form_data.method = data.method;
                    this.form_data.url = data.url;
                    this.form_data.description = data.description;
                    this.json_data = JSON.parse(data.content.replace(/\\/g,""));
                }else{
                    this.notFound = true;
                    // this.$message.error(message);
                }
            })
            .catch(err=>{
                // this.notFound = true;
                this.$message.error(err);
            });
        },
        submit(){
            this.$refs.form.validate(valid=>{
                if(valid){
                    let content = this.$refs.jsonEditor.getValue();
                    if(content == "error"){
                        this.$notify.error({
                            title:"错误",
                            message:"接口数据格式有误，请修改~",
                            duration:2500
                        });
                        return false;
                    }else if(content.length < 20){
                        this.$notify.error({
                            title:"错误",
                            message:"接口数据不能少于20个字符，请修改~",
                            duration:2500
                        });
                        return false;
                    }

                    let fun = !this.form_data.id ? add : update;
                    fun({
                        content,
                        ...this.form_data
                    })
                    .then(res=>{
                        const { code,data,message } = res;
                        if(code === 200){
                            this.$router.replace("/project/"+this.form_data.projectid);
                            this.$message.success("操作成功");
                        } else{
                            this.$message.error(message);
                        }
                    })
                    .catch(err=>{
                        this.$message.error(err);
                    });
                }else{
                    return false;
                }
            });
        },
        goback(){
            // this.$router.go(-1);
            this.$router.replace("/project/"+this.form_data.projectid);
        }
    }
}
</script>


<style lang="scss" scoped>
.project-info{
    background:#f3f5f7;
    border-radius: 5px;
    .el-row{
        // background:#4f6f7f;
        margin-bottom:10px;
        .el-left{
            padding:15px;
            .btn{
                margin-top:30px;
            }
        }
        .el-right{
            background:#f3f5f7;
            padding:15px;
            .tit{
                font-weight: 700;
                padding-bottom:10px;
                span{
                    font-weight: 100;
                    color:#999;
                    a{
                        color:#42b983;
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>