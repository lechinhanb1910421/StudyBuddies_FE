<script>
import MenuTile from './MenuTile.vue'
export default {
  components: { MenuTile },
  data() {
    return {
      majorName: 'Infomation Technology'
    }
  }
}
</script>
<template lang="">
  <section class="profile">
    <div class="profile_tile">
      <img src="../assets/Ganyu_2.jpeg" class="avatar_img" alt="Avatar" />
      <span class="profile_name">Nhan Le Nguyen Chi</span>
    </div>
    <div class="menu_tiles">
      <i class="fas fa-graduation-cap menu_icon"></i>
      <span class="menu_name">Majors</span>
    </div>
    <div class="tiles">
      <MenuTile :tileName="this.majorName"></MenuTile>
      <MenuTile :tileName="this.majorName"></MenuTile>
      <MenuTile :tileName="this.majorName"></MenuTile>
      <MenuTile :tileName="this.majorName"></MenuTile>
      <MenuTile :tileName="this.majorName"></MenuTile>
      <MenuTile :tileName="this.majorName"></MenuTile>
    </div>
    <div class="menu_tiles">
      <span>
        <i class="fas fa-tags menu_icon"></i>
      </span>
      <span class="menu_name">Topics</span>
    </div>
    <div class="tiles">
      <MenuTile :tileName="this.majorName"></MenuTile>
      <MenuTile :tileName="this.majorName"></MenuTile>
      <MenuTile :tileName="this.majorName"></MenuTile>
    </div>
  </section>
</template>
<style scoped>
.tiles {
  padding-inline-start: 10px;
  padding-inline-end: 5px;
}
.menu_tiles {
  height: 50px;
  background-color: rgb(255 255 255 /0.3);
  padding-inline-start: 20px;
  display: flex;
  gap: 10px;
  padding-right: 5px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  margin-bottom: 5px;
  transition: background-color linear 0.1s;
  font-size: 18px;
  font-weight: 600;
}
.menu_icon {
  font-size: 23px;
}
hr.profile {
  opacity: 0.5;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0;
  margin-left: -10px;
  margin-right: -10px;
}
.profile {
  color: white;
  padding: 10px;
  padding-top: 15px;
  position: fixed;
  top: 60px;
  height: 100vh;
  left: 0;
  width: 22%;
  background-color: #181a1d;
}
.profile_tile {
  padding-inline-start: 15px;
  height: 55px;
  background-color: rgb(255 255 255 /0.3);
  display: flex;
  gap: 15px;
  padding-right: 5px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  margin-bottom: 12px;
  transition: background-color linear 0.1s;
}
.profile_tile:hover {
  background-color: rgb(255 255 255 /0.45);
}
.profile_name {
  font-size: 17px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.avatar_img {
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
