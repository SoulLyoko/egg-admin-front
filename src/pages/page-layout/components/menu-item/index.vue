<template>
  <el-menu-item :index="menu.path" @click="menuItemClick(menu)">
    <i class="menu-icon" :class="menu.icon"></i>
    <span class="menu-title">{{ menu.title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "menu-item",
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    menuItemClick(menu) {
      if (menu.parentId === "0") {
        this.$store.commit("SET_ASIDE_MENU", menu.children);
      } else if (menu.component.name === "page-iframe" && menu.meta.blank) {
        window.open(menu.meta.url, "_blank");
      } else {
        this.$router.push({
          path: menu.path + (menu.query || "")
        });
      }
    }
  }
};
</script>

<style lang="" scoped></style>
