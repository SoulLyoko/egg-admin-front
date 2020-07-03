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
      <template #deptId="{row}">
        <span>{{row.dept&&row.dept.name}}</span>
      </template>
      <template #deptIdForm="{row}">
        <avue-input-tree
          v-model="row.deptId"
          placeholder="请选择上级部门"
          :dic="deptTree"
          :props="{label:'name',value:'_id'}"
        ></avue-input-tree>
      </template>
      <template #roleIds="{row}">
        <el-tag v-for="item in row.roles" :key="item._id">{{item.name}}</el-tag>
      </template>
      <template #roleIdsForm="{row}">
        <el-select v-model="row.roleIds" multiple>
          <el-option v-for="item in roleList" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import crudMixin from "@/mixins/crud";
import { tableOption } from "./option";
import { getList, create, update, remove } from "@/api/sys/user";
import { getList as getRoleList } from "@/api/sys/role";
import { getTree as getDeptTree } from "@/api/sys/dept";

export default {
  name: "upms-user",
  mixins: [crudMixin],
  data() {
    return {
      crudOption: {
        getList,
        create,
        update,
        remove
      },
      tableOption,
      roleList: [],
      deptTree: []
    };
  },
  created() {
    getRoleList().then(res => {
      this.roleList = res.data;
    });
    getDeptTree().then(res => {
      this.deptTree = res.data;
    });
  }
};
</script>
