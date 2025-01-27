import { defineStore } from "pinia"
import { BaseNotificationOptions, Notification } from "../interfaces/notification.interfaces";


export const useNotificationStore = defineStore('notifications', {
	state: () => ({
		notifications: [] as Notification[]
	}),

	actions: {
		addNotification(notification: BaseNotificationOptions) {
			const id = crypto.randomUUID();
			const defaultNotification: Notification = {
				id,
				modalId: id,
				position: 'bottom-center',
				duration: 2000,
				type: 'info',
				...notification,
			};
			this.notifications.push(defaultNotification);
			return id;
		},

		removeNotification(id: string) {
			this.notifications = this.notifications.filter(n => n.id !== id);
		},

		removeNotificationsByModal(modalId: string) {
			this.notifications = this.notifications.filter(n => n.modalId !== modalId);
		},
	}
})
