<template>
  <el-menu-item :index="menu.path" @click="menuItemClick(menu)">
    <i class="menu-icon" :class="menu.icon"></i>
    <span class="menu-title">{{ menu.title }}</span>
  </el-menu-item>
</template>

<script>
import menuMixin from "@/mixins/menu.js";

export default {
  name: "menu-item",
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  },
  mixins: [menuMixin],
  data() {
    return {};
  }
};
</script>

<style lang="" scoped></style>
