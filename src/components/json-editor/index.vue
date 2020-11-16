<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/addon/lint/lint.css";
import "codemirror/lib/codemirror.css";
// import "codemirror/theme/rubyblue.css";
require("script-loader!jsonlint");
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";
import jsonformat from "stringify-object";

// import "codemirror/addon/hint/show-hint.css";

export default {
  name: "JsonEditor",
  /* eslint-disable vue/require-prop-types */
  props: ["value"],
  data() {
    return {
      jsonEditor: false
    };
  },
  watch: {
    value(value) {
      const editorValue = this.jsonEditor.getValue();
      if (value !== editorValue) {
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
      }
    }
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: "application/json",
      // mode:"text/html",
      gutters: ["CodeMirror-lint-markers"],
      //   theme: 'rubyblue',
      lint: true,
      // extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键
    });

    this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
    this.jsonEditor.on("change", cm => {
      this.$emit("changed", cm.getValue());
      this.$emit("input", cm.getValue());
    });
  },
  methods: {
    getValue() {
      //   return this.jsonEditor.getValue()
      try {
        return jsonformat(JSON.parse(this.jsonEditor.getValue()));
      } catch (error) {
        return "error";
      }
    },
    format() {
      var value = this.getValue();
      if (value == "error") {
        return;
      }
      // value = jsonformat(JSON.parse(value));
      this.jsonEditor.setValue(value.replace(/\\/g,""));
    }
  }
};
</script>

<style scoped>
.json-editor {
  height: 100%;
  position: relative;
}
.json-editor >>> .CodeMirror {
  height: auto;
  min-height: 300px;
}
.json-editor >>> .CodeMirror-scroll {
  min-height: 600px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #f08047;
}
</style>
