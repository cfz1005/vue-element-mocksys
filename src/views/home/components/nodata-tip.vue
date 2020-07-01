<template>
    <div style="font-size:25px; text-align:center;padding:50px 0;">
        {{msg}}
    </div>
</template>

<script>
export default {
    props:{
        msg:{
            type:String
        }
    }
}
</script>