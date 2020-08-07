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
      <i class="el-icon-plus" v-if="listType === 'picture-card'"></i>
      <el-button size="small" type="primary" v-else>点击上传</el-button>
    </template>
    <slot></slot>
  </el-upload>
</template>

<script>
/**
 * @component 文件上传组件
 * @prop {String} value 已上传的id(多个,分割)
 * @prop {String} accept 接受上传的文件类型
 * @prop {String} listType 文件列表的类型
 * @prop {Number} limit 最大允许上传个数
 * @prop {Boolean} multiple 是否支持多选文件
 * @prop {Boolean} disabled 是否禁用
 * @prop {Boolean} drag 是否启用拖拽上传
 * @prop {Boolean} showFileList 是否显示已上传文件列表
 * @event success(res,file,fileList) 成功回调
 * @event error(err) 失败回调
 * @event remove(file,fileList) 删除文件回调
 * @event change(fileList) 文件列表变化时回调
 */
import { getList, remove } from "@/api/sys/upload";

export default {
  name: "file-upload",
  props: ["value", "accept", "listType", "limit", "multiple", "disabled", "drag", "showFileList"],
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
          ...(item.response?.data || {})
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
      this.$emit("error", err);
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
        this.$ImagePreview(this.fileList, index); //avue预览图片
      } else {
        window.open(file.url, "_blank");
      }
    }
  }
};
</script>

<style lang="" scoped></style>
