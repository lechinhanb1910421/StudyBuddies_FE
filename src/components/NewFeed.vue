<script>
export default {}
</script>
<template lang="">
  <div class="container">
    <div class="newPost_ctn">
      <div class="newPost_ava">
        <img src="../assets/Ganyu_2.jpeg" height="50" width="50" style="border-radius: 50%" alt="..." />
      </div>
      <div class="newPost_textarea">
        <input type="text" class="form-control" placeholder="Hello Everett, how is your study?" />
      </div>
    </div>
    <h1 style="color: white">Preserved for New Feed</h1>
  </div>
</template>
<style scoped>
.newPost_ctn {
  margin-top: 15px;
  color: white;
  background-color: rgb(255 255 255 /0.1);
  display: flex;
  justify-content: center;
  border-radius: 1rem;
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 20px;
}
.newPost_ava {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.newPost_textarea {
  flex: 10;
}
.newPost_textarea input {
  height: 60px;
  background-color: rgb(255 255 255 /0.15);
  box-shadow: none;
  border: none;
  font-size: 18px;
  border-radius: 1rem;
}
.newPost_textarea input::placeholder {
  color: white;
  opacity: 0.7;
}
.container {
  padding-inline: 5%;
  height: 300vh;
}
</style>
