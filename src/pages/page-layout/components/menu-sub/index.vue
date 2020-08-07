<template>
  <el-submenu :index="menu.path">
    <template slot="title">
      <i class="menu-icon" :class="menu.icon"></i>
      <span class="menu-title">{{ menu.title }}</span>
    </template>
    <template v-for="item in menu.children">
      <menu-sub :menu="item" :key="item._id" v-if="item.children && item.children.length"></menu-sub>
      <menu-item :menu="item" :key="item._id" v-else></menu-item>
    </template>
  </el-submenu>
</template>

<script>
import menuItem from "../menu-item";

export default {
  name: "menu-sub",
  components: { menuItem },
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="" scoped></style>
