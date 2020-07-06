<template>
  <basic-container class="index-page">
    <p>
      <b>应用名称</b>
      <span>Egg Admin</span>
    </p>
    <p>
      <b>版本信息</b>
      <span>{{appVersion}}</span>
    </p>
    <p v-for="(value,key) in sysInfo" :key="key">
      <b>{{key}}</b>
      <span>{{value}}</span>
    </p>
  </basic-container>
</template>

<script>
import { getSysInfo } from "@/api/sys/sysinfo";
const version = require("@/../package.json").version;

export default {
  name: "index-page",
  data() {
    return {
      appVersion: version,
      sysInfo: {}
    };
  },
  created() {
    getSysInfo().then(res => {
      this.sysInfo = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.index-page {
  p {
    b {
      margin-right: 10px;
    }
  }
}
</style>
