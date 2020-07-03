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
    ></avue-crud>
  </basic-container>
</template>

<script>
import crudMixin from "@/mixins/crud";
import { tableOption } from "./option";
import { getLogList, getList } from "@/api/sys/log";

export default {
  name: "sys-log",
  mixins: [crudMixin],
  data() {
    return {
      crudOption: {
        created: false,
        getList: null
      },
      tableOption
    };
  },
  watch: {
    $route: {
      handler(val) {
        const { type } = val.query;
        this.crudOption.getList = type ? getLogList[type] : getList;
        this.getDataList();
      },
      immediate: true
    }
  }
};
</script>
