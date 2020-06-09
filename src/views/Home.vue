<template>
  <div class="home">
    <router-link :to="{name: 'config'}">开始</router-link>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
}
</script>
<style lang="scss">
.home {
  padding: 20px;
}
</style>
