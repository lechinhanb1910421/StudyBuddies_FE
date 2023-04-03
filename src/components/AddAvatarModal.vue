<script>
import { storage } from '@/services/firebase.service'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import UserService from '@/services/User.service'
import ToastService from '@/services/toast.service'
export default {
  props: ['user'],
  emits: ['newAvaAdded'],
  data() {
    return {
      newImagePreview: '',
      loginName: '',
      newAvaImageUrl: '',
      newImageData: '',
      isNewAva: false
    }
  },
  methods: {
    async addUserAvatar() {
      await UserService.addUserAvatar(this.$keycloak.token, this.newAvaImageUrl)
      ToastService.showAvatarAddedToast()
      this.$emit('newAvaAdded')
    },
    async removePreviewImage() {
      this.newImagePreview = this.user.avatars[0].avaUrl
      this.isNewAva = false
    },
    async setPreviewImage(event) {
      this.newImageData = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(this.newImageData)
      reader.onload = (e) => {
        this.newImagePreview = e.target.result
      }
      this.isNewAva = true
    },
    async uploadImage() {
      const newImage_name = Math.floor(Date.now() / 1000) + this.newImageData.name
      const storageRef = ref(storage, `/${this.loginName}/avatars/${newImage_name}`)
      const uploadTask = uploadBytesResumable(storageRef, this.newImageData)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          this.uploadProgress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          //   console.log('UPLOADING ', this.uploadProgress, '%')
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
            this.newAvaImageUrl = downloadURL
            this.addUserAvatar()
          })
        }
      )
    },
    submitAvatar() {
      this.$refs.closeModal.click()

      if (!this.isNewAva) {
        return
      }
      ToastService.showAvatarProcessingToast()
      this.uploadImage()
    },
    discardChanges() {
      this.$refs.closeModal.click()
      this.newImagePreview = this.user.avatars[0].avaUrl
      this.isNewAva = false
    }
  },
  async created() {
    this.loginName = this.user.loginName
    if (this.user.avatars[0] != undefined) {
      this.newImagePreview = this.user.avatars[0].avaUrl
    }
  },
  watch: {
    user: function (value) {
      this.loginName = this.user.loginName
      this.newImagePreview = value.avatars[0].avaUrl
    }
  }
}
</script>
<template>
  <div class="modal modal-lg fade" id="addAvaModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h1 class="modal-title fs-5 w-100" id="modal_title">Update new avatar</h1>
          <button type="button" ref="closeModal" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="image_preview">
            <img class="new_ava_preview" :src="newImagePreview" alt="..." />
          </div>
          <div class="add_pic_ctrs">
            <button type="button" class="btn btn-danger add_pic_del_btn" @click="removePreviewImage" v-if="this.isNewAva">Remove image</button>
            <label for="add_ava_input" class="add_pic" v-if="!this.isNewAva">
              <i class="fas fa-images"></i>
              <span>Add new avatar</span>
              <input
                type="file"
                name="photo"
                ref="add_ava_input"
                id="add_ava_input"
                @change="setPreviewImage"
                accept="image/png, image/gif, image/jpeg" />
            </label>
            <button type="button" class="btn btn-secondary btn_discard" @click="discardChanges">Discard changes</button>
            <button type="button" class="btn btn-primary btn_add_post" @click="submitAvatar" :disabled="!this.isNewAva">Change avatar</button>
          </div>
        </div>
        <!-- <div class="modal-footer"></div> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}
.new_ava_preview {
  aspect-ratio: 1/1;
  width: 90%;
  border-radius: 50%;
  outline: 5px solid #65e7e5;
}
.image_preview {
  /* width: 70%; */
  flex: 5;
}
.add_pic_ctrs {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}
.modal-body {
  height: 420px;
  display: flex;
  overflow-y: scroll;
}
.modal-body::-webkit-scrollbar {
  display: none;
}
.modal-dialog {
  width: 700px;
  margin: auto;
}
.modal-content {
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
.image_preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
.add_pic {
  flex: 1;
  cursor: pointer;
  /* background-color: rgb(255 255 255/0.3); */
  background-color: #4fdd2f;
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
.add_pic_del_btn {
  font-size: 18px;
  min-height: 40px;
  flex: 1;
}
.btn_add_post,
.btn_discard {
  font-size: 18px;
  flex: 1;
}
#add_ava_input {
  display: none;
}
</style>
