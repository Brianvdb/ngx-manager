import {Notification} from '../interfaces/notifications.interface';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class NotificationsService {

    // Data.
    private list: Notification[] = [];
    private list$: BehaviorSubject<Notification[]> = new BehaviorSubject(this.list);

    /**
     * @returns An observable basic-list of notifications.
     */
    public get items(): Observable<Notification[]> {
        return this.list$.asObservable();
    }

    /**
     * Adds a new notifications to the notifications-list.
     *
     * @param {string} message The message of the notification.
     * @param {string} type The type of notification.
     */
    public create(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
        const id = this.getId();
        const item = {type: type, message: message, id: id};

        // Add the new item.
        this.add(item);

        // Remove it after 3000 milliseconds.
        Observable
            .of(item)
            .delay(3000)
            .first()
            .subscribe(item => this.remove(item));
    }

    /**
     * Adds a new notification to the array.
     *
     * @param item The notification item.
     */
    private add(item: Notification): void {
        this.list.push(item);
        this.list$.next(this.list);
    }

    /**
     * Removes an item from the array.
     *
     * @param item The notification item.
     */
    private remove(item: Notification): void {
        this.list.forEach((notification, index) => {
            if (notification.id === item.id) {
                this.list.splice(index, 1);
            }
        });

        this.list$.next(this.list);
    }

    /**
     * @returns A random id for the notification.
     */
    private getId(): string {
        return Math.random().toString(36).substr(2, 10);
    }

}
