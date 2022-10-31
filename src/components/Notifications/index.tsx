import { useEffect } from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import { NotificationsProps } from "./index.types";
import 'react-toastify/dist/ReactToastify.css';

const Notifications = (props: NotificationsProps): JSX.Element => {

  const { notifications } = props;

  useEffect(() => {
    if ( notifications?.length ) { 

      const notification = notifications[notifications.length - 1];
      const options: ToastOptions = {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        };
      if (notification.type === 'success') {
        toast.success(<div data-testid='toast-success'>{notification.message}</div>, options);
      } 
      if (notification.type === 'fail') {
        toast.error(<div data-testid='toast-fail'>{notification.message}</div>, options);
      } 
    }
  }, [notifications]);

  return <>
    <ToastContainer />
  </>
};

export {Notifications};