<template>
    <div>
        <editor ref="aceEditor" theme="monokai" width="100%" v-model="content" @init="init" :lang="propLang" :height="propHeight" :options="options"></editor>
    </div>
</template>

<script>
import editor from 'vue2-ace-editor'
import jsBeautify from 'js-beautify'
export default {
    components:{
        editor
    },
    props:{
        propContent:{
            type:String,
            default:""
        },
        propLang:{
            type:String,
            default:"javascript"
        },
        propHeight:{
            type:Number,
            default:300
        }
    },
    data(){
        return {
            content:"",
            options:{
                // 配置
                enableBasicAutocompletion: true, // 启用基本自动完成
                enableSnippets: true, // 启用代码段
                enableLiveAutocompletion: true, // 启用实时自动完成
                showPrintMargin:false, // 去除编辑器里的竖线
            }
        }
    },
    methods:{
        //  依照需要添加
        init: function () {
            require('brace/ext/language_tools')
            // require('brace/theme/chrome')
            require('brace/theme/monokai') 
            require('brace/snippets/dockerfile')
            require('brace/mode/dockerfile')
            // require('brace/mode/json')
            // require('brace/snippets/json')
            require('brace/snippets/javascript')
            require('brace/mode/javascript')
        },
        getValue() {
            try {
                this.format();
                return this.content;
            } catch (error) {
                return "error";
            }
        },
        format() {
            this.content = jsBeautify(this.content);
        }
    },
    created(){
        // console.log(typeof this.propContent,this.propContent+'');
        // let text = JSON.parse(this.propContent);
        // let text = JSON.parse(this.propContent,function(key, val){
        //     if(val.indexOf && val.indexOf('function')>-1){
        //         return eval("(function(){return "+ val +"})()");
        //     }
        //     return val;
        // });
        // this.content = jsBeautify(text);
        this.content = jsBeautify(this.propContent);

        // let text = this.propContent;
        // if(typeof this.propContent === 'object'){
        //     text = JSON.stringify(text,function(key, val){
        //         if(typeof val === 'function'){
        //             return val + '';
        //         } else if(typeof val === 'string' && val.indexOf('function')>-1){
        //             return val.replace(/function/ig, '');
        //         }else{
        //             return val;
        //         }
        //     });
        // }
        
        // this.content = jsBeautify(text);

    },
    watch:{
        propContent: function (newVal, oldVal) {
            let text = jsBeautify(newVal);
            text = text.replace(/"function(.*?)}"/g,(rd)=>{
                return eval("(function(){return "+rd+"})()");
            });
            this.content = text;




            // console.log(typeof newVal);
            // let text = jsBeautify(newVal);
            // console.log(text);
            // this.content = jsBeautify(newVal)
            // // text = eval("("+text+")");
            // // console.log(text);

            // text = JSON.parse(text,function(key, val){
            //     if(val.indexOf && val.indexOf('function')>-1){
            //         return eval("(function(){return "+ val +"})()");
            //     }
            //     return val;
            // });
            // console.log(text);

            // text = JSON.stringify(text,function(key, val){
            //     if(typeof val === 'function'){
            //         return val + '';
            //     } else if(typeof val === 'string' && val.indexOf('function')>-1){
            //         return val.replace(/function/ig, '');
            //     }else{
            //         return val;
            //     }
            // });
            // console.log(text);



            // this.content = text;
            // this.content = jsBeautify(newVal)
        },
        // // 将编辑的内容实时传给父组件
        // content: function (newVal, oldVal) {
        //     this.$emit('editor-change', newVal, this.propLang)
        // }
    }
}
</script>
<style lang="scss">
    .ace_error{background:none;}
</style>