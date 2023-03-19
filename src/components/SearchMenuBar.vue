<script>
import MenuTile from './MenuTile.vue'
export default {
  components: { MenuTile },
  data() {
    return {
      filters: ['Post', 'User', 'School', 'Major', 'Topic']
    }
  }
}
</script>
<template>
  <section class="menu_container">
    <div class="search_title_ctn">
      <i class="fas fa-search menu_icon"></i>
      <span class="search_title">Search result</span>
    </div>
    <hr class="menu_hr" />
    <div class="filters_ctn" v-if="this.filters">
      <div v-for="(title, index) in this.filters" :key="index">
        <MenuTile :titleName="title"></MenuTile>
      </div>
    </div>
  </section>
</template>
<style scoped>
.menu_hr {
  margin-block: 7px;
}
.menu_container {
  width: 23%;
  height: 100vh;
  color: white;
  padding: 10px;
  position: fixed;
  left: 0;
  border-right: 1px solid rgb(255 255 255 /0.2);
}
.search_title_ctn {
  height: 50px;
  padding-inline-start: 20px;
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
}
.menu_icon {
  font-size: 24px;
}
.filters_ctn {
  padding-inline: 15px;
  font-size: 20px;
}
.filters_ctn * {
  margin-bottom: 10px;
}
</style>
