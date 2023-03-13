<script>
export default {
  props: ['tileName']
}
</script>
<template>
  <div class="tile">
    <span>{{ tileName }}</span>
  </div>
</template>
<style scoped>
.tile {
  height: 45px;
  padding: 8px;
  padding-inline-start: 25px;
  display: flex;
  margin-bottom: 1px;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  font-size: 16px;
  font-weight: 600;
  /* background-color: rgb(255 255 255 /0.2); */
  transition: background-color linear 0.1s;
}
.tile:hover {
  background-color: rgb(255 255 255 /0.2);
  cursor: pointer;
}
</style>
