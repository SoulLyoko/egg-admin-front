<template>
  <div class="main-tabs">
    <el-tabs
      :value="activeTab.path"
      type="card"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
      @contextmenu.native="handleContextmenu"
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
        <el-dropdown-item command="closeLeftTabs"><i class="el-icon-back"></i>关闭左侧</el-dropdown-item>
        <el-dropdown-item command="closeRightTabs"><i class="el-icon-right"></i>关闭右侧</el-dropdown-item>
        <el-dropdown-item command="closeOtherTabs"><i class="el-icon-close"></i>关闭其他</el-dropdown-item>
        <el-dropdown-item command="closeAllTabs"><i class="el-icon-error"></i>关闭全部</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <ul class="tabs-contextmenu el-dropdown-menu el-popper" :style="contextmenuStyle" v-show="contextmenuVisible">
      <li class="el-dropdown-menu__item" @click="closeLeftTabs(targetPath)"><i class="el-icon-back"></i>关闭左侧</li>
      <li class="el-dropdown-menu__item" @click="closeRightTabs(targetPath)"><i class="el-icon-right"></i>关闭右侧</li>
      <li class="el-dropdown-menu__item" @click="closeOtherTabs(targetPath)"><i class="el-icon-close"></i>关闭其他</li>
      <li class="el-dropdown-menu__item" @click="closeAllTabs()"><i class="el-icon-error"></i>关闭全部</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "main-tabs",
  data() {
    return {
      contextmenuVisible: false,
      contextmenuStyle: {},
      targetPath: ""
    };
  },
  computed: {
    ...mapGetters(["openTabs", "activeTab"])
  },
  methods: {
    ...mapActions(["closeTab", "closeAllTabs", "closeOtherTabs", "closeLeftTabs", "closeRightTabs"]),
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
    },
    handleContextmenu(event) {
      event.preventDefault();
      event.stopPropagation();
      this.contextmenuStyle = {
        top: event.clientY + "px",
        left: event.clientX + "px"
      };
      this.targetPath = event.target.id.replace("tab-", "");
      this.contextmenuVisible = true;
      window.addEventListener("mousedown", this.mousedownListener);
    },
    mousedownListener() {
      setTimeout(() => {
        this.contextmenuVisible = false;
      }, 100);
      window.removeEventListener("mousedown", this.mousedownListener);
    }
  }
};
</script>

<style lang="scss" scoped>
.main-tabs {
  .tabs-contextmenu {
    position: absolute;
  }
}
</style>
