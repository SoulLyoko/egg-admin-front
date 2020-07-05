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
      <template #menu="{row}">
        <el-button
          type="text"
          size="small"
          icon="el-icon-plus"
          @click="addDictItem(row)"
          v-if="row.parentId === '0'"
          >新增字典项</el-button
        >
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import crudMixin from "@/mixins/crud";
import { tableOption } from "./option";
import { getTree, create, update, remove } from "@/api/sys/dict";

export default {
  name: "sys-dict",
  mixins: [crudMixin],
  data() {
    return {
      crudOption: {
        getList: getTree,
        create,
        update,
        remove
      },
      tableOption
    };
  },
  methods: {
    async addDictItem(row) {
      this.$refs.crud.rowAdd();
      await this.$nextTick();
      this.formData.parentId = row._id;
      this.formData.type = row.type;
    }
  }
};
</script>
