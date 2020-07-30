<template>
  <basic-container>
    <avue-crud v-bind="bindVal" v-on="onEvent">
      <template #menuLeft>
        <file-upload multiple v-model="uploadIds" :show-file-list="false" @change="fileListChange"></file-upload>
      </template>
      <template #menuRight>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="batchDel">批量删除</el-button>
      </template>
      <template #menu="{row,index}">
        <el-button type="default" size="small" icon="el-icon-view" @click="preview(row, index)">预览</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import crudMixin from "@/mixins/crud";
import { tableOption } from "./option";
import { getList, remove } from "@/api/sys/upload";

export default {
  name: "sys-template",
  mixins: [crudMixin],
  data() {
    return {
      crudOption: {
        getList,
        remove
      },
      tableOption,
      uploadIds: ""
    };
  },
  methods: {
    fileListChange() {
      this.getDataList();
    },
    preview(row, index) {
      this.$ImagePreview(this.tableData, index);
    }
  }
};
</script>
