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
      <template #parentIdForm="{row}">
        <avue-input-tree
          v-model="row.parentId"
          placeholder="请选择上级部门"
          :dic="deptTree"
          :props="{label:'name',value:'_id'}"
        ></avue-input-tree>
      </template>
      <template #menu="{row}">
        <el-button type="text" size="small" icon="el-icon-plus" @click="addDept(row)">新增下级</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import crudMixin from "@/mixins/crud";
import { tableOption } from "./option";
import { getTree, create, update, remove } from "@/api/sys/dept";

export default {
  name: "upms-dept",
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
  computed: {
    deptTree() {
      return [
        {
          name: "一级部门",
          _id: "0",
          children: this.tableData
        }
      ];
    }
  },
  methods: {
    async addDept(row) {
      this.$refs.crud.rowAdd();
      await this.$nextTick();
      this.formData.parentId = row._id;
    }
  }
};
</script>
