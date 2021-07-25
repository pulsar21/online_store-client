import { ExclamationCircleOutlined } from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";
import { SIGNIN_ROUTE } from "../../utils/consts";

export const showLogOutModal = (e, showModal, signOut, history) => {
    e.preventDefault();
    confirm({
      title: 'Вы точно хотите выйти?',
      icon: <ExclamationCircleOutlined style={{color: 'red'}}/>,
      content: 'Если вы выйдите, то кто же будет следить за этим миром 👺',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      async onOk() {
        await signOut();
        history.push(SIGNIN_ROUTE);
        showModal(false);
      },
      onCancel() {
        showModal(false);
      },
    });
}
