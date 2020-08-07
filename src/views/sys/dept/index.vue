<template>
  <basic-container>
    <avue-crud v-bind="bindVal" v-on="onEvent">
      <template #parentIdForm="{row}">
        <dept-select v-model="row.parentId" :topLevel="true"></dept-select>
      </template>
      <template #menu="{row}">
        <el-button type="default" size="small" icon="el-icon-plus" @click="addDept(row)">新增下级</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import crudMixin from "@/mixins/crud";
import { tableOption } from "./option";
import { getTree, create, update, remove } from "@/api/sys/dept";

export default {
  name: "sys-dept",
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
    async addDept(row) {
      this.$refs.crud.rowAdd();
      await this.$nextTick();
      setTimeout(() => {
        this.formData.parentId = row._id;
      });
    }
  }
};
</script>
