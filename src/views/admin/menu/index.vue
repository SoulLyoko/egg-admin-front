<template>
  <basic-container>
    <avue-crud v-bind="bindVal" v-on="onEvent">
      <template #parentIdForm="{row}">
        <avue-input-tree
          v-model="row.parentId"
          placeholder="请选择上级菜单"
          :dic="menuTree"
          :props="{ label: 'title', value: '_id' }"
        ></avue-input-tree>
      </template>
      <template #icon="{row}">
        <i :class="row.icon" />
      </template>
      <template #iconForm="{row}">
        <icon-select v-model="row.icon"></icon-select>
      </template>
      <template #menu="{row}">
        <el-button type="default" size="small" icon="el-icon-plus" @click="addMenu(row)" v-if="permission.addSubBtn">
          新增下级
        </el-button>
      </template>
      <template #componentForm="{row}">
        <dict
          v-model="row.component"
          placeholder="请选择或输入前端组件"
          filterable
          allow-create
          default-first-option
          :dictData="componentOptions"
        ></dict>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import crudMixin from "@/mixins/crud";
import { tableOption } from "./option";
import { getTree, create, update, remove } from "@/api/sys/menu";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "sys-menu",
  mixins: [crudMixin],
  data() {
    return {
      crudOption: {
        getList: getTree,
        create,
        update,
        remove
      },
      tableOption,
      componentOptions: ["Layout", "Main", "Iframe"].map(item => {
        return { label: item, value: item };
      })
    };
  },
  watch: {
    formData: {
      handler(val) {
        const { component, type } = val;
        tableOption.column.forEach(item => {
          switch (item.prop) {
            case "query":
              item.display = component?.includes("/");
              break;
            case "url":
            case "blank":
              item.display = component === "Iframe";
              break;
            case "icon":
            case "path":
            case "component":
            case "name":
            case "cache":
              item.display = type === "0";
              break;
            default:
              break;
          }
        });
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters(["perm"]),
    permission() {
      return {
        addBtn: !!this.perm.sys_menu_save,
        editBtn: !!this.perm.sys_menu_update,
        delBtn: !!this.perm.sys_menu_delete,
        addSubBtn: !!this.perm.sys_menu_save
      };
    },
    menuTree() {
      return [
        {
          title: "一级菜单",
          _id: "0",
          children: this.tableData
        }
      ];
    }
  },
  methods: {
    ...mapActions(["getMenu"]),
    async addMenu(row) {
      this.$refs.crud.rowAdd();
      await this.$nextTick();
      setTimeout(() => {
        this.formData.parentId = row._id;
      });
    },
    async afterUpdate() {
      this.getMenu();
    }
  }
};
</script>
