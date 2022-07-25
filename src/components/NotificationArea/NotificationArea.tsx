import notificationsActions from "features/notifications/actions";
import { selectNotifications } from "features/notifications/selectors";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";

const NotificationArea = () => {
    const notifications = useSelector(selectNotifications);
    const dispatch = useDispatch();
    return (
        <>
            {notifications.map((notification) => (
                <Notification
                    onClose={() => dispatch(
                        notificationsActions.removeNotification(notification.id)
                    )}
                    key={notification.id}
                    notification={notification}
                />
            ))}
        </>
    );
};

export default NotificationArea;
