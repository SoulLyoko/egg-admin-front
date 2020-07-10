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
        <span>{{ row.dept && row.dept.name }}</span>
      </template>
      <template #deptIdForm="{row}">
        <dept-select v-model="row.deptId"></dept-select>
      </template>
      <template #roleIds="{row}">
        <el-tag v-for="item in row.roles" :key="item._id">{{
          item.name
        }}</el-tag>
      </template>
      <template #roleIdsForm="{row}">
        <sys-dict
          v-model="row.roleIds"
          multiple
          :dictData="roleList"
        ></sys-dict>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import crudMixin from "@/mixins/crud";
import { tableOption } from "./option";
import { getList, create, update, remove } from "@/api/sys/user";
import { getList as getRoleList } from "@/api/sys/role";

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
      roleList: []
    };
  },
  created() {
    getRoleList().then(res => {
      this.roleList = res.data.map(item => {
        return {
          label: item.name,
          value: item._id
        };
      });
    });
  }
};
</script>
