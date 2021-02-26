import { notification} from 'antd';

export default function openNotificationWithIcon(response) {
    const type = response.success ? 'success' : 'error';
    return notification[type]({ message: '알림', description: response.msg });
}