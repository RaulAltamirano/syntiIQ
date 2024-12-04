export interface BaseNotificationOptions {
	message: string;
	title: string;
	type?: NotificationType;
	duration?: number;
	position?: NotificationPosition;
	modalId?: string;
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface Notification extends Required<BaseNotificationOptions> {
	id: string;
}
