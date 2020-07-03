<template>
  <el-menu-item :index="menu.path" @click="menuItemClick(menu)">
    <i class="menu-icon" :class="menu.icon"></i>
    <span class="menu-title">{{menu.title}}</span>
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
      console.log("menuItemClick -> menu", menu);
      if (menu.parentId === "0") {
        this.$store.commit("SET_ASIDE_MENU", menu.children);
      } else {
        this.$router.push({
          path: menu.path + (menu.query || "")
        });
      }
    }
  }
};
</script>

<style lang="" scoped>
</style>