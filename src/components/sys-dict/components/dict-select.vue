<template>
  <el-select v-bind="$attrs" v-on="$listeners">
    <el-option
      :label="item.label"
      :value="item.value"
      :disabled="item.diabled"
      v-for="item in $parent.options"
      :key="item.value"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: "dict-select",
  data() {
    return {};
  }
};
</script>
