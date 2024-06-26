<script>
import { storage } from '@/services/firebase.service'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import PostService from '@/services/Post.service'
import { loggedInUserStorage } from '@/stores/loggedInUser'
import ToastService from '@/services/toast.service'

export default {
  emits: ['postEdited'],
  props: ['oldPost'],
  setup() {
    const userStore = loggedInUserStorage()
    return { userStore }
  },
  data() {
    return {
      post_content: '',
      post_content_lg: true,
      newImagePreview: '',
      hasImage: false,
      uploadProgress: '',
      postTopic: 1,
      postMajor: 1,
      postImageUrl: '',
      loginName: '',
      newInputImage: false,
      majors: {
        General: 1,
        'Information Technology': 2,
        'Information System': 3,
        'Computer Science': 4,
        'Software Engineering': 5,
        'Computer Network and Data Communication': 6,
        'Multimedia Communication': 7
      },
      topics: { General: 1, Recreation: 2, 'Knowleage Share': 3, Experience: 4, Help: 5, Sale: 6 }
    }
  },
  methods: {
    setEditedData() {
      this.post_content = this.oldPost.content
      if (this.oldPost.picUrls[0].length > 0) {
        this.newImagePreview = this.oldPost.picUrls[0]
        this.hasImage = true
      } else {
        this.newImagePreview = ''
        this.newImageData = ''
        this.hasImage = false
      }
      this.postTopic = this.topics[this.oldPost.topicName]
      this.postMajor = this.majors[this.oldPost.majorName]
    },
    getUserLoginName() {
      this.loginName = this.userStore.user.loginName
    },
    async updatePost() {
      const payload = {
        content: this.post_content,
        topicId: this.postTopic,
        majorId: this.postMajor,
        imageUrl: this.oldPost.picUrls[0]
      }
      if (this.newInputImage) {
        payload.imageUrl = this.postImageUrl
      }
      if (!this.hasImage) {
        payload.imageUrl = ''
      }
      this.resetAddPostModal()
      this.removePreviewImage()
      const data = await PostService.updatePost(this.$keycloak.token, payload, this.oldPost.postId)
      if (data.message == 'Post was updated successfully') {
        this.$emit('postEdited')
        setTimeout(() => {
          ToastService.showPostUpdateToast()
        }, 127)
      }
    },
    async submitEditPostForm() {
      ToastService.showPostProcessingToast()
      this.$refs.closeModal.click()
      if (this.newInputImage) {
        await this.uploadImage(this.userLoginName)
      } else {
        this.updatePost()
      }
    },
    resize_textarea() {
      const { textarea } = this.$refs
      var newHeight = textarea.scrollHeight ?? 60
      if (newHeight > 260) {
        newHeight = 260
      }
      textarea.style.height = 'auto'
      textarea.style.height = newHeight - 4 + 'px'
    },
    async setPreviewImage(event) {
      this.newImageData = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(this.newImageData)
      reader.onload = (e) => {
        this.newImagePreview = e.target.result
      }
      this.hasImage = true
      this.newInputImage = true
    },
    async removePreviewImage() {
      this.newImagePreview = ''
      this.newImageData = ''
      // this.$refs.add_img_input.files[0] = ''
      this.hasImage = false
    },
    async uploadImage() {
      this.getUserLoginName()
      const newImage_name = Math.floor(Date.now() / 1000) + this.newImageData.name
      const storageRef = ref(storage, `/${this.loginName}/postImages/${newImage_name}`)
      const uploadTask = uploadBytesResumable(storageRef, this.newImageData)
      // console.log('UPLOADING FOR USER: ' + this.loginName)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          this.uploadProgress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          // console.log('UPLOADING ', this.uploadProgress, '%')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            this.postImageUrl = downloadURL
            this.updatePost()
          })
        }
      )
    },
    setPostTopic(event) {
      this.postTopic = event.target.value
    },
    setPostMajor(event) {
      this.postMajor = event.target.value
    },
    resetAddPostModal() {
      this.post_content = ''
      this.newImagePreview = ''
      this.postTopic = 1
      this.postMajor = 1
      this.resize_textarea()
    }
  },
  watch: {
    post_content: function (val) {
      if (val.length > 127) {
        this.post_content_lg = false
      } else {
        this.post_content_lg = true
      }
      this.resize_textarea()
    }
  },
  mounted() {
    this.setEditedData()
    this.resize_textarea()
  }
}
</script>
<template>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header text-center">
        <h1 class="modal-title fs-5 w-100" id="modal_title">Edit your post</h1>
        <button type="button" ref="closeModal" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div style="flex-grow: 1; flex: 1">
          <div class="options mb-2">
            <div class="opts_topic">
              <label for="topic">Topic: </label>
              <select class="form-select post_opts" :value="this.postTopic" @change="setPostTopic($event)" id="topic" aria-label="Select post topic">
                <option value="1" selected>General</option>
                <option value="2">Recreation</option>
                <option value="3">Knowleage Share</option>
                <option value="4">Experience</option>
                <option value="5">Help</option>
                <option value="6">Sale</option>
              </select>
            </div>
            <div class="opts_major">
              <label for="major">Major: </label>
              <select class="form-select post_opts" :value="this.postMajor" @change="setPostMajor($event)" id="major" aria-label="Select post Major">
                <option value="1" selected>All Majors</option>
                <option value="2">Information Technology</option>
                <option value="3">Information System</option>
                <option value="4">Computer Science</option>
                <option value="5">Software Engineering</option>
                <option value="6">Computer Network and Data Communication</option>
                <option value="7">Multimedia Communication</option>
              </select>
            </div>
          </div>
          <div class="content mb-3">
            <textarea
              class="form-control content_textarea"
              rows="1"
              maxlength="5000"
              ref="textarea"
              :class="{ post_text_lg: this.post_content_lg }"
              v-model="this.post_content"
              @focus="resize_textarea"
              @keyup="resize_textarea">
            </textarea>
          </div>
          <img v-if="this.hasImage" class="add_pic_pre_image" :src="this.newImagePreview" alt="..." />
        </div>
        <div class="add_pic_ctrs">
          <button type="button" class="btn btn-danger add_pic_del_btn" @click="removePreviewImage" v-if="this.hasImage">Delete Image</button>
          <label :for="'edit_img_input' + this.oldPost.postId" class="add_pic" v-if="!this.hasImage">
            <i class="fas fa-images"></i>
            <span>Add Image</span>
            <input
              type="file"
              name="photo"
              :ref="'edit_img_input' + this.oldPost.postId"
              :id="'edit_img_input' + this.oldPost.postId"
              @change="setPreviewImage"
              style="display: none"
              accept="image/png, image/gif, image/jpeg" />
          </label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btn_add_post" @click="submitEditPostForm">Edit post</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.add_pic_ctrs {
  margin-top: 10px;
  margin-inline: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 18px;
  width: 95%;
}
.add_pic_del_btn {
  font-size: 18px;
  min-height: 40px;
  flex: 1;
}
.add_pic_pre_image {
  width: 100%;
}
.add_pic {
  flex: 1;
  cursor: pointer;
  /* background-color: rgb(255 255 255/0.3); */
  background-color: #66f645;
  color: black;
  min-height: 40px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  gap: 10px;
  transition: all 0.15s;
}
.add_pic:hover {
  background-color: #8fe97b;
}
.post_text_lg {
  font-size: 30px !important;
}
.btn-close {
  background-color: rgb(0 0 0 /0.25);
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.modal-body {
  height: 550px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.modal-body::-webkit-scrollbar {
  display: none;
}
.content_textarea,
.content_textarea:focus {
  background-color: transparent;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 20px;
  resize: none;
}
.content_textarea::-webkit-scrollbar {
  display: none;
}
select.post_opts,
select option {
  border: 1px solid rgb(255 255 255 /0.1);
  color: white;
  background-color: rgb(255 255 255 /0.2);
}
.opts_topic,
.opts_major {
  flex: 1;
  /* background-color: rgb(255 255 255 /0.3); */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}
select option {
  background-color: #696969;
}
.options {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
.modal-dialog {
  width: 600px;
  margin: auto;
}
.modal-content {
  /* background-color: #4A4A4A; */
  /* background-color: #282828; */
  color: white;
  background-color: #373737;
  border: 1px solid rgb(255 255 255 /0.2);
}
.modal-header {
  /* display: flex;
  justify-content: center; */
  background-color: rgb(255 255 255 /0.15);
  border-bottom: 1px solid rgba(255 255 255 /0.2);
}
.modal-footer {
  width: 100%;
  border-top: 1px solid rgba(255 255 255 /0.2);
  display: flex;
  justify-content: center;
  padding-block: 7px;
}
.btn_add_post {
  font-size: 18px;
  font-weight: 600;
  width: 90%;
}
</style>
