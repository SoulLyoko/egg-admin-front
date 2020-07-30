<template>
  <basic-container>
    <avue-crud v-bind="bindVal" v-on="onEvent">
      <template #menu="{row}">
        <el-button type="default" size="small" icon="el-icon-circle-plus-outline" @click="openMenu(row)">
          菜单权限
        </el-button>
      </template>
    </avue-crud>
    <el-dialog class="menu-dialog" title="菜单权限" :visible.sync="menuVisible" width="60%">
      <el-tree
        ref="menuTree"
        :data="menuTreeData"
        node-key="_id"
        default-expand-all
        show-checkbox
        :check-strictly="true"
        :props="{ label: 'title' }"
        @check="menuCheck"
      ></el-tree>
      <span slot="footer">
        <el-button type="primary" @click="saveMenu()">保存</el-button>
        <el-button @click="menuVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import crudMixin from "@/mixins/crud";
import { tableOption } from "./option";
import { getList, create, update, remove } from "@/api/sys/role";
import { getTree as getMenuTree } from "@/api/sys/menu";
import { mapActions } from "vuex";

export default {
  name: "upms-role",
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
      menuVisible: false,
      menuTreeData: []
    };
  },
  created() {
    getMenuTree().then(res => {
      this.menuTreeData = res.data;
    });
  },
  methods: {
    ...mapActions(["getMenu"]),
    async openMenu(row) {
      this.menuVisible = true;
      await this.$nextTick();
      this.formData = Object.assign({}, row);
      this.$refs.menuTree.setCheckedKeys(row.menuIds);
    },
    menuCheck(VNode, { checkedKeys, halfCheckedKeys }) {
      this.formData.menuIds = [...checkedKeys, ...halfCheckedKeys];
    },
    async saveMenu() {
      const { _id, menuIds } = this.formData;
      await this.handleUpdate({ _id, menuIds });
      this.getMenu();
      this.menuVisible = false;
    }
  }
};
</script>

<style lang="scss">
.menu-dialog {
  .el-dialog__body {
    height: 500px;
    overflow-y: scroll;
  }
}
</style>
