<script>
export default {
  props: ['titleName']
}
</script>
<template>
  <div class="tile">
    <tippy :content="this.titleName">
      <span>{{ titleName }}</span>
    </tippy>
  </div>
</template>
<style scoped>
.tile {
  position: relative;
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
  transition: background-color linear 0.1s;
  overflow-x: visible;
}

.tile span {
  margin: auto 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tile:hover {
  background-color: rgb(255 255 255 /0.2);
  cursor: pointer;
}
</style>
