import { notification } from "antd";

export const SuccessNotification = (message, status, statusText, id) => {
        notification['success']({
        message: `${message}`
    });
}