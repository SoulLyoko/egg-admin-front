<template>
  <div class="header-search">
    <transition name="fade" mode="out-in">
      <el-tooltip effect="dark" content="搜索" placement="bottom" v-if="!inputVisible">
        <i class="el-icon-search" @click="showInput"></i>
      </el-tooltip>
      <el-autocomplete
        ref="searchInput"
        size="small"
        v-model="searchKey"
        :fetch-suggestions="querySearch"
        placeholder="输入菜单名称搜索"
        @select="handleSelect"
        v-if="inputVisible"
        style="width:150px;"
      >
        <i class="el-icon-close el-input__icon" slot="suffix" @click="closeInput()"></i>
        <template #default="{item}">
          <div>
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </div>
          <div style="color:#aaa">{{ item.path }}</div>
        </template>
      </el-autocomplete>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import menuMixin from "@/mixins/menu.js";

export default {
  name: "header-search",
  mixins: [menuMixin],
  data() {
    return {
      inputVisible: false,
      searchKey: "",
      timeout: null
    };
  },
  computed: {
    ...mapGetters(["headerMenu"]),
    routeList() {
      const list = [];
      const genList = arr => {
        arr.forEach(item => {
          if (item.children?.length) {
            genList(item.children);
          } else {
            list.push(item);
          }
        });
      };
      genList(this.headerMenu);
      return list;
    }
  },
  methods: {
    async showInput() {
      this.inputVisible = true;
      await this.$nextTick();
      setTimeout(() => {
        this.$refs.searchInput.focus();
      }, 500);
    },
    closeInput(delay = false) {
      clearTimeout(this.timeout);
      if (delay) {
        this.timeout = setTimeout(() => {
          this.inputVisible = false;
          this.searchKey = "";
        }, 10000);
      } else {
        this.inputVisible = false;
        this.searchKey = "";
      }
    },
    querySearch(queryString, cb) {
      let results = this.routeList;
      if (queryString) {
        results = this.routeList.filter(item => {
          return (
            item.meta.title.includes(queryString) ||
            item.path.includes(queryString)
          );
        });
      }
      this.closeInput(true);
      cb(results);
    },
    handleSelect(item) {
      this.menuItemClick(item);
      this.closeInput();
    }
  }
};
</script>

<style lang="" scoped></style>
