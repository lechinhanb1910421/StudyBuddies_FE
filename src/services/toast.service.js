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
  async showPostUpdateToast() {
    clearToasts()
    return createToast(
      {
        title: 'Post was updated successfully',
        description: 'You might need to refresh the page to see the changes'
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
  async showErrorToast(errMessage) {
    clearToasts()
    return createToast(
      {
        title: 'Something went wrong',
        description: errMessage
      },
      {
        timeout: 7000,
        toastBackgroundColor: '#E97777',
        position: 'bottom-right',
        showIcon: 'true',
        type: 'success',
        transition: 'bounce'
      }
    )
  }
}
export default new ToastService()
