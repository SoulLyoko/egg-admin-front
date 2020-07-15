<template>
  <basic-container>
    <avue-crud v-bind="bindVal" v-on="onEvent">
      <template #menu="{row}">
        <el-button
          type="text"
          size="small"
          icon="el-icon-plus"
          @click="addDictItem(row)"
          v-if="row.parentId === '0'"
        >新增字典项</el-button>
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
      setTimeout(() => {
        this.formData.parentId = row._id;
        this.formData.type = row.type;
      });
    }
  }
};
</script>
