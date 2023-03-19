<script>
import SearchMenuBar from '@/components/SearchMenuBar.vue'
export default {
  components: { SearchMenuBar },
  props: ['sQuery']
}
</script>
<template>
  <div class="container-fluid">
    <SearchMenuBar></SearchMenuBar>
    <div class="mainCol">
      <h2>this is main col</h2>
      <h2>Query: {{ sQuery }}</h2>
    </div>
  </div>
</template>
<style scoped>
.container-fluid {
  padding-inline: 0;
  background-color: #181a1d;
  padding-top: 61px;
  display: block;
  min-height: 100vh;
  display: flex;
  border-right: 1px solid white;
}
.mainCol {
  color: white;
  margin-left: 23%;
  /* background-color: rgb(255 255 255 /0.3); */
  flex-grow: 1;
}
</style>
