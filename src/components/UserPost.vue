<script>
import PostCommentGroup from '@/components/PostCommentGroup.vue'
// import { storage } from '@/services/firebase.config.js'
// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
export default {
  components: { PostCommentGroup },
  methods: {
    // async uploadImage() {
    //   const newImageName = Math.floor(Date.now() / 1000) + this.newImageData.name
    //   const storageRef = ref(storage, `userImages/${newImageName}`)
    //   const uploadTask = uploadBytesResumable(storageRef, this.newImageData)
    //   this.isUploading = true
    //   uploadTask.on(
    //     'state_changed',
    //     (snapshot) => {
    //       // this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //       switch (snapshot.state) {
    //         case 'paused':
    //           console.log('Upload is paused')
    //           break
    //       }
    //     },
    //     (error) => {
    //       console.log(error)
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //         this.newImageLink = downloadURL
    //         await this.userStore.updateUserInfo(this.editedFName, this.editedLName, downloadURL, this.user.email)
    //         this.informUploaded()
    //         this.newImageData = ''
    //         this.isImageChanged = false
    //         this.isUploading = false
    //       })
    //     }
    //   )
    // },
  }
}
</script>
<template lang="">
  <div class="post_ctn">
    <section class="p_header">
      <div class="p_header_info">
        <div class="p_header_ava">
          <img src="../assets/Ganyu_2.jpeg" class="posts_ava" alt="..." />
        </div>
        <div class="p_header_name">Nhan Le Nguyen Chi<i class="fa fa-check-circle-o" aria-hidden="true"></i></div>
      </div>
      <div class="p_header_subinfo">
        <div class="p_header_creTime">
          <i class="far fa-clock"></i>
          <span>2d</span>
        </div>
        <div class="p_header_major">
          <i class="fas fa-graduation-cap"></i>
          <span> Information Technology</span>
        </div>
      </div>
    </section>
    <section class="p_content">
      <div class="p_content_text">Hello this is a test post</div>
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
      <hr class="hr-white" />
      <PostCommentGroup></PostCommentGroup>
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
  margin-bottom: 3%;
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
  font-weight: 600;
  font-size: 15px;
}
.posts_ava {
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
