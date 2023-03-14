<script>
export default {}
</script>
<template lang="">
  <div class="profile_tile">
    <img src="../assets/Ganyu_2.jpeg" class="avatar_img" alt="Avatar" />
    <span class="profile_name">Nhan Le Nguyen Chi</span>
  </div>
</template>
<style scoped>
.profile_tile {
  padding-inline-start: 15px;
  height: 50px;
  display: flex;
  gap: 10px;
  padding-left: 20px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  margin-bottom: 5px;
  transition: background-color linear 0.1s;
}
.profile_tile:hover {
  background-color: rgb(255 255 255 /0.4);
}
.profile_name {
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.avatar_img {
  height: 35px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
