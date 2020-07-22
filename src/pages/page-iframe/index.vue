<template>
  <basic-container type="ghost">
    <iframe :src="src" frameborder="0" height="99.5%" width="100%" style="background-color:#fff;"></iframe>
  </basic-container>
</template>

<script>
export default {
  name: "page-iframe",
  data() {
    return {
      src: ""
    };
  },
  watch: {
    $route: {
      handler(val) {
        this.src = val.meta.url;
      },
      immediate: true
    }
  }
};
</script>
