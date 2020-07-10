<template>
  <basic-container>
    <avue-crud
      ref="crud"
      v-model="formData"
      :page="page"
      :table-loading="tableLoading"
      :option="tableOption"
      :data="tableData"
      @current-change="pageCurrentChange"
      @size-change="pageSizeChange"
      @search-change="searchChange"
      @search-reset="searchReset"
      @refresh-change="getDataList"
      @selection-change="selectionChange"
      @sort-change="sortChange"
      @row-save="handleSave"
      @row-update="handleUpdate"
      @row-del="rowDel"
    >
      <template #menuLeft>
        <file-upload
          multiple
          v-model="uploadIds"
          :show-file-list="true"
          @change="fileListChange"
        ></file-upload>
      </template>
      <template #menu="{row,index}">
        <el-button
          type="text"
          size="small"
          icon="el-icon-view"
          @click="preview(row, index)"
          >预览</el-button
        >
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
    fileListChange(fileList) {
      this.getDataList();
    },
    preview(row, index) {
      this.$ImagePreview(this.tableData, index);
    }
  }
};
</script>
