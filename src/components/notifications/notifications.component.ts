import {trigger, animate, style, transition, query, stagger, keyframes} from '@angular/animations';
import {NotificationsService} from '../../services/notifications.service';
import {Notification} from '../../interfaces/notifications.interface';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'bb-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    animations: [trigger('listAnimation', [
        transition('* => *', [
            query(':enter', style({opacity: 0}), {optional: true}),

            query(':enter', stagger('400ms', [
                animate('400ms ease-in-out', keyframes([
                    style({opacity: 0, transform: 'translateY(-50%)', offset: 0}),
                    style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
                ]))]), {optional: true}),

            query(':leave', stagger('500ms', [
                animate('500ms ease-in-out', keyframes([
                    style({height: '*', opacity: 1, transform: 'translateX(0)', offset: 0}),
                    style({height: '*', opacity: 0, transform: 'translateX(-25%)', offset: 0.75}),
                    style({height: 0, opacity: 0, transform: 'translateX(-25%)', offset: 1.0})
                ]))]), {optional: true})
        ])
    ])]
})
export class NotificationsComponent implements OnInit {

    // Data.
    public items$: Observable<Notification[]>;

    /**
     * Default constructor.
     *
     * @param notifications The notifications service.
     */
    public constructor(private notifications: NotificationsService) {
    }

    /**
     * Gets triggered when the component is initialized.
     */
    public ngOnInit(): void {
        this.items$ = this.notifications.items;
    }

    /**
     * Method to optimize the Angular for-loop.
     *
     * @param index The index of the item.
     * @param item The notification item.
     *
     * @returns The id of the notification.
     */
    public trackById(index: string, item: Notification): string {
        return item.id;
    }

}
