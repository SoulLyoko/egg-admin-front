<template>
  <div class="main-tabs">
    <el-tabs
      :value="activeTab.path"
      type="card"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        v-for="tab in openTabs"
        :key="tab.path"
        :label="tab.meta.title"
        :name="tab.path"
        :closable="tab.path !== '/index'"
      ></el-tab-pane>
    </el-tabs>
    <el-dropdown @command="handleCommand">
      <el-button class="main-tabs-menu" icon="el-icon-arrow-down"></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="closeOtherTabs">
          <i class="el-icon-close"></i>关闭其他
        </el-dropdown-item>
        <el-dropdown-item command="closeAllTabs">
          <i class="el-icon-error"></i>关闭全部</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "main-tabs",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["openTabs", "activeTab"])
  },
  methods: {
    ...mapActions(["closeTab", "closeAllTabs", "closeOtherTabs"]),
    tabClick(tab) {
      if (this.$route.path === tab.name) return;
      const route = this.openTabs.find(item => item.path === tab.name);
      this.$router.push(route);
    },
    tabRemove(name) {
      this.closeTab(name);
    },
    handleCommand(command) {
      this[command]();
    }
  }
};
</script>

<style lang="" scoped></style>
