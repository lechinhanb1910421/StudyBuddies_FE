<script>
export default {}
</script>
<template lang="">
  <div class="post_ctn">
    <section class="p_header">
      <div class="p_header_info">
        <div class="p_header_ava">
          <img src="../assets/Ganyu_2.jpeg" class="posts_ava" alt="..." />
        </div>
        <div class="p_header_name">Nhan Le Nguyen Chi Nhan</div>
      </div>
      <div class="p_header_subinfo">
        <div class="p_header_creTime">
          <i class="far fa-clock"></i>
          <span>2d</span>
        </div>
        <div class="p_header_major">
          <i class="fas fa-graduation-cap"></i>
          <span>Information Technology</span>
        </div>
      </div>
    </section>
    <section class="p_content">
      <div class="p_content_text">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
        the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five Lorem
      </div>
      <div class="p_content_img">
        <img src="../assets/Ganyu_2.jpeg" class="post_content" alt="..." />
      </div>
      <div class="p_stats">
        <div class="p_stats_like">
          <i class="far fa-heart"> </i>
          <span>272</span>
        </div>
        <div class="p_stats_no_cmt">
          <span>272</span>
          <span>comments</span>
        </div>
      </div>
      <hr class="hr-white" />
      <div class="p_ctrl">
        <button class="btn p_ctrl_btn_bg btn_like" type="button">
          <i class="far fa-heart"> </i>
          <span>Love</span>
        </button>
        <button class="btn p_ctrl_btn_bg btn_cmt" type="button">
          <i class="far fa-comment"></i>
          <span>Comment</span>
        </button>
        <button class="btn p_ctrl_btn_bg btn_share" type="button">
          <i class="fas fa-share-alt"></i>
          <span>Share</span>
        </button>
      </div>
    </section>
  </div>
</template>
<style scoped>
.p_ctrl i {
  padding-right: 5px;
}
.p_ctrl {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-inline: 30px;
}
.p_ctrl_btn_bg {
  background-color: rgb(255 255 255 /0.15);
}
.p_ctrl button {
  color: white;
  font-size: 16px;
  font-weight: 700;
  flex: 1;
}
.p_ctrl button:hover {
  background-color: rgb(255 255 255 /0.3);
}
.p_stats_like i,
.p_stats_no_cmt span {
  padding-right: 8px;
}
.p_stats {
  padding-top: 10px;
  padding-left: 30px;
  color: white;
  display: flex;
  opacity: 0.9;
  font-size: 17px;
  gap: 50px;
}
hr.hr-white {
  margin: 10px;
  border-top: 1px solid white;
}
.p_content_text {
  padding: 20px;
  padding-top: 5px;
  color: white;
  font-size: 17px;
}
.p_content_img img {
  max-width: 100%;
  max-height: 100%;
}
.post_ctn {
  background-color: rgb(255 255 255 /0.1);
  border-radius: 0.75rem;
}
.p_content {
  padding-bottom: 20px;
}
.p_header {
  /* background-color: rgb(255 255 255 /0.4); */
  display: flex;
  align-self: center;
  padding-inline: 5px;
}
.p_header_info {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  padding: 10px;
  overflow: hidden;
}
.p_header_name {
  font-size: 18px;
  color: white;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.p_header_subinfo {
  flex: 1;
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  align-items: center;
  color: white;
  gap: 10px;
}
.p_header_creTime,
.p_header_major {
  padding: 8px;
  padding-inline: 11px;
  border-radius: 0.75rem;
  background-color: rgb(255 255 255 /0.15);
}
.p_header_creTime span,
.p_header_major span {
  padding-left: 5px;
}
.posts_ava {
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
