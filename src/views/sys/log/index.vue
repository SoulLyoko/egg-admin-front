<template>
  <basic-container>
    <avue-crud v-bind="bindVal" v-on="onEvent"></avue-crud>
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
