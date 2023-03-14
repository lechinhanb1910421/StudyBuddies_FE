<script>
export default {}
</script>
<template>
  <div class="group_tile_ctn">
    <img src="../assets/Ganyu_2.jpeg" class="group_ava" alt="Avatar" />
    <span class="group_name">Group Name goes here Group Name goes here</span>
  </div>
</template>
<style scoped>
.group_tile_ctn {
  padding-inline: 15px;
  height: 50px;
  display: flex;
  gap: 10px;
  padding-left: 20px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  margin-bottom: 6px;
  transition: background-color linear 0.1s;
}
.group_tile_ctn:hover {
  background-color: rgb(255 255 255 /0.4);
}
.group_name {
  font-size: 17px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.group_ava {
  height: 35px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
