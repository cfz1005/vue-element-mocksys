<template>
    <div>
        <el-dialog title="创建项目" :visible="visible"  :close-on-click-modal="false" width="500px" :before-close="closeDialog">
            <edit-base ref="editBase" @close="closeDialog"></edit-base>
        </el-dialog>
    </div>
</template>

<script>
import editBase from './project-edit-base'
export default {
    name:"project-add",
    data() {
        return {
        }
    },
    props:{
        visible:{
            type:Boolean,
            default:false
        }
    },
    components:{
        editBase
    },
    methods:{
        // 关闭弹窗
        // 通过provide传递给子组件
        closeDialog(refresh = false){
            this.$emit("update:visible",false);
            refresh && this.$emit("refresh");
        }
    }
}
</script>