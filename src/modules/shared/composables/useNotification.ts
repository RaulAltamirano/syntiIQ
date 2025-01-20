import { computed } from "vue";
import { useNotificationStore } from "../store/notificationStore"
import { BaseNotificationOptions, Notification } from "../interfaces/notification.interfaces";

export function useNotification() {
	const store = useNotificationStore()

	const defaultTitles: Record<Notification['type'], string> = {
		success: 'Operación exitosa',
		error: 'Ha ocurrido un error',
		warning: 'Advertencia',
		info: 'Información'
	};

	const createNotification = (type: Notification['type']) =>
		(message: string, title: string = defaultTitles[type], options: Partial<BaseNotificationOptions> = {}) =>
			store.addNotification({
				message,
				title,
				type,
				duration: 2000,
				...options		
			});
			

	return {
		notify: (options: NotificationOptions) => store.addNotification(options),
		success: createNotification('success'),
		error: createNotification('error'),
		warning: createNotification('warning'),
		info: createNotification('info'),
		remove: store.removeNotification,
		removeAllForModal: store.removeNotificationsByModal,
		notifications: computed(() => store.notifications)
	}
}
