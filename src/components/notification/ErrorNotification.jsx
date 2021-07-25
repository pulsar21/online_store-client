import { notification } from "antd";

export const ErrorNotification = (message, status, statusText, id, errorData=null) => {
    let error = errorData?.errors?.errors.map((value, index) => <li key={index}>
        <span>
            {value.msg}
        </span>
    </li>);
    const errorBlock = (
        <div>{error}</div>
    );
    notification['error']({
    message: `${message}`,
    description: errorBlock ? errorBlock : `${status}` 
    });
}