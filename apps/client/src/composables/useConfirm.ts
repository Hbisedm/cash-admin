import { createApp } from 'vue'
import Confirm from '~/components/TheConfirm.vue'

const CONTAINER_NAME = 'main'

export async function useConfirm({
  title = 'Are you sure?',
  content = '',
  okText = 'YES',
  cancelText = 'NO',
  onOk = () => {},
  onCancel = () => {},
  option = {},
}) {
  const mountNode = document.createElement('div')
  const appContainer = document.querySelector(`#${CONTAINER_NAME}`)
  const instance = createApp(Confirm, {
    title,
    content,
    okText,
    cancelText,
    onOk,
    onCancel,
    ...option,
    onClose: () => {
      instance.unmount()
      appContainer?.removeChild(mountNode)
    },
  })

  appContainer?.appendChild(mountNode)
  instance.mount(mountNode)
}
