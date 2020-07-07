<template>
  <div class="header-theme">
    <i class="el-icon-brush" @click="open"></i>
    <el-dialog title="主题设置" :visible.sync="dialogVisible" width="30%">
      <el-radio-group v-model="activeTheme">
        <el-radio v-for="theme in themeList" :key="theme.name" :label="theme.name">{{theme.title}}</el-radio>
      </el-radio-group>
      <center slot="footer">
        <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
      </center>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "header-theme",
  data() {
    return {
      themeList: [
        { name: "default", title: "默认" },
        { name: "classic", title: "经典" }
      ],
      dialogVisible: false,
      activeTheme: ""
    };
  },
  computed: {
    ...mapGetters(["themeName"])
  },
  watch: {
    activeTheme(val) {
      this.SET_THEME_NAME(val);
    }
  },
  created() {
    this.SET_THEME_NAME(this.themeName);
    this.activeTheme = this.themeName;
  },
  methods: {
    ...mapMutations(["SET_THEME_NAME"]),
    open() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="" scoped>
</style>