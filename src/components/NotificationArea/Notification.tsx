import Snackbar from "components/Common/SnackBar";
import { Notification as NotificationModel } from "model/models";
import CloseIcon from "@mui/icons-material/Close";
import theme from "styleguide/theme";
import { useEffect } from "react";
import notificationsActions from "features/notifications/actions";
import useThunkDispatch from './../../hooks/useThunkDispatch';

type Props = {
    notification: NotificationModel;
    onClose: () => void;
};

const notificationColor: { [type: string]: string } = {
    'error': theme.palette.error.main,
    'success': theme.palette.success.main,
    'info': theme.palette.info.main
}

const Notification: React.FC<Props> = ({
    notification: { message, id, colored, type, autoClose, autoCloseDelay = 2000 },
    onClose,
}) => {
    const color = notificationColor[type]
    const dispatch = useThunkDispatch()
    useEffect(() => {
        if (autoClose) {
            setTimeout(() => {
                dispatch(notificationsActions.removeNotification(id))
            }, autoCloseDelay)
        }
    }, [autoClose, autoCloseDelay, dispatch, id])

    return (
        <Snackbar
            message={message}
            action={<CloseIcon onClick={onClose} />}
            colored={colored}
            key={id}
            open={true}
            color={color}
        />
    );
};

export default Notification;
