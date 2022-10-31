export type NotificationTypes = 'success' | 'fail';

export type Notification = {
  type: NotificationTypes;
  message: string;
};

export type NotificationsProps = { notifications: Notification[] };