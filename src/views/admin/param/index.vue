<template>
  <basic-container>
    <avue-crud v-bind="bindVal" v-on="onEvent"></avue-crud>
  </basic-container>
</template>

<script>
import crudMixin from "@/mixins/crud";
import { tableOption } from "./option";
import { getList, create, update, remove } from "@/api/sys/param";

export default {
  name: "sys-param",
  mixins: [crudMixin],
  data() {
    return {
      crudOption: {
        getList,
        create,
        update,
        remove
      },
      tableOption
    };
  }
};
</script>
