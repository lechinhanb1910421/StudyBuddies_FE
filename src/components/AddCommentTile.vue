<script>
export default {}
</script>
<template>
  <div class="add_cmt_ctn">
    <div class="add_cmt_ava">
      <img src="../assets/Ganyu_2.jpeg" class="add_cmt_ava" alt="..." />
    </div>
    <div class="add_cmt_input">
      <input type="text" class="form-control" placeholder="Leave a comment" />
    </div>
  </div>
</template>
<style scoped>
.add_cmt_ctn {
  padding-inline: 20px;
  height: 40px;
  display: flex;
  /* background-color: rgb(255 255 255 /0.2); */
  margin-bottom: 5px;
  gap: 8px;
}
.add_cmt_ava {
  height: 35px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
.add_cmt_input {
  flex-grow: 1;
}
.add_cmt_input input {
  background-color: rgb(255 255 255 /0.2);
  border: none;
  outline: none;
  box-shadow: none;
  border-radius: 1rem;
}
.add_cmt_input input::placeholder {
  color: white;
  opacity: 0.8;
}
</style>
