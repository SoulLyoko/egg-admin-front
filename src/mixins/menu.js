export default {
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
