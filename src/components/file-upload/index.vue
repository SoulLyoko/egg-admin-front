<template>
  <el-upload
    :accept="accept"
    :action="action"
    :disabled="disabled"
    :drag="drag"
    :file-list="fileList"
    :headers="headers"
    :limit="limit"
    :list-type="listType"
    :multiple="multiple"
    :show-file-list="showFileList"
    :before-remove="handleBeforeRemove"
    :on-exceed="handleExceed"
    :on-error="handleError"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
  >
    <template v-if="!$slots.default">
      <i class="el-icon-plus" v-if="listType==='picture-card'"></i>
      <el-button size="small" type="primary" v-else>点击上传</el-button>
    </template>
    <slot></slot>
  </el-upload>
</template>

<script>
import { getList, remove } from "@/api/sys/upload";

export default {
  name: "file-upload",
  props: {
    value: { type: String, default: "" },
    accept: String,
    disabled: Boolean,
    drag: Boolean,
    limit: Number,
    listType: String,
    multiple: Boolean,
    showFileList: Boolean
  },
  data() {
    return {
      action: "/api/upload",
      headers: {
        Authorization: "Bearer " + this.$util.cookie.get("token") || ""
      },
      fileList: []
    };
  },
  created() {
    if (!this.value) return;
    getList({ id: this.value }).then(res => {
      this.fileList = res.data.map(item => {
        return {
          ...item,
          name: item.filename
        };
      });
    });
  },
  methods: {
    handleSuccess(res, file, fileList) {
      this.fileList = fileList.map(item => {
        return {
          ...item,
          ...(item.response && item.response.data ? item.response.data : {})
        };
      });
      const value = this.fileList.map(item => item._id).join(",");
      this.$emit("input", value);
      this.$emit("success", res, file, this.fileList);
      this.$emit("change", this.fileList);
    },
    handleError(err) {
      console.error(err);
      this.$message.error("上传失败");
      this.$emit("error");
    },
    handleExceed() {
      this.$message.warning("超出文件上传数量限制");
    },
    handleBeforeRemove(file) {
      return this.$confirm("确认删除文件?", "提示", {
        type: "warning"
      }).then(() => remove(file._id));
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      const value = this.fileList.map(item => item._id).join(",");
      this.$emit("input", value);
      this.$emit("remove", file, fileList);
      this.$emit("change", fileList);
    },
    handlePreview(file) {
      if (file.mime.includes("image")) {
        let index = 0;
        this.fileList.forEach((item, i) => {
          if (item.uid === file.uid) {
            index = i;
          }
        });
        this.$ImagePreview(this.fileList, index);
      } else {
        window.open(file.url, "_blank");
      }
    }
  }
};
</script>

<style lang="" scoped>
</style>
