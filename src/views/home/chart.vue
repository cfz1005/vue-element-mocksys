<template>
    <div>
        
        <no-data-tip v-if="notFound" msg="开发中..."></no-data-tip>
    </div>
</template>

<script>
import noDataTip from './components/nodata-tip'
export default {
    data(){
        return {
            notFound: true
        }
    },
    components:{
        noDataTip
    },
}
</script>