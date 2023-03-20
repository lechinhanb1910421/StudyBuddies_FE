import { createToast, clearToasts } from 'mosha-vue-toastify'
class ToastService {
  async showPostProcessingToast() {
    return createToast(
      {
        title: 'Your post is being processed',
        description: "We'll inform you when post is ready"
      },
      {
        timeout: 30000,
        toastBackgroundColor: '#2778a4',
        position: 'bottom-right',
        showIcon: 'true',
        type: 'info',
        hideProgressBar: 'true',
        transition: 'bounce'
      }
    )
  }
  async showPostAddedToast() {
    clearToasts()
    return createToast(
      {
        title: 'Post was added successfully',
        description: 'Your post was added to Study Buddies'
      },
      {
        timeout: 7000,
        toastBackgroundColor: '#20cbac',
        position: 'bottom-right',
        showIcon: 'true',
        type: 'success',
        transition: 'bounce'
      }
    )
  }
}
export default new ToastService()
