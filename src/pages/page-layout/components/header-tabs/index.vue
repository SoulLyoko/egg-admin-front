<template>
  <div class="header-tabs">
    <el-tabs :value="activeTab.name" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.meta.title"
        :name="tab.name"
        :closable="tab.name!=='index'"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "header-tabs",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["tabs", "activeTab"])
  },
  methods: {
    ...mapActions(["closeTab"]),
    tabClick(tab) {
      if (this.$route.name === tab.name) return;
      const route = this.tabs.find(item => item.name === tab.name);
      this.$router.push(route);
    },
    tabRemove(name) {
      this.closeTab(name);
    }
  }
};
</script>

<style lang="" scoped>
</style>