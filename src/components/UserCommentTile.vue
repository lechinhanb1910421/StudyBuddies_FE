<script>
export default {}
</script>
<template>
  <div class="cmt_ctn">
    <div>
      <img src="../assets/Ganyu_2.jpeg" class="cmt_ava" alt="..." />
    </div>
    <div class="cmt_main">
      <div class="cmt_main_header">
        <span class="cmt_user_name">Nhan Le Nguyen Chi</span>
        <span class="cmt_user_creTime">22m <span class="cmt_user_creTime_full">Tuesday March 14th 2023 at 10:40 AM</span></span>
      </div>
      <div class="cmt_main_text">
        <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
        </span>
      </div>
      <!-- <input type="text" class="form-control" placeholder="Leave a comment" /> -->
    </div>
  </div>
</template>
<style scoped>
.cmt_user_creTime_full {
  color: black;
  position: absolute;
  width: 250px;
  top: 22px;
  left: 0;
  height: 30px;
  font-size: 14px;
  border-radius: 0.5rem;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: rgb(255 255 255);
}
.cmt_main_header {
  display: flex;
}
.cmt_user_name {
  font-weight: 700;
}
.cmt_user_creTime {
  position: relative;
  font-size: 15px;
  padding-left: 10px;
  opacity: 0.9;
}
.cmt_user_creTime:hover .cmt_user_creTime_full {
  display: flex;
}
.cmt_ctn {
  padding-left: 5px;
  display: flex;
  margin-bottom: 12px;
  gap: 6px;
}
.cmt_ava {
  height: 35px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
.cmt_main {
  background-color: rgb(255 255 255 /0.2);
  display: flex;
  padding: 5px;
  padding-left: 10px;
  margin-right: 10px;
  flex-direction: column;
  flex-grow: 1;
  color: white;
  border-radius: 1rem;
}
.cmt_main input {
  background-color: transparent;
  border: none;
  outline: none;
  box-shadow: none;
  border-radius: 1rem;
}
.cmt_main input::placeholder {
  color: white;
  opacity: 0.8;
}
</style>
