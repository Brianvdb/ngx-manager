import {trigger, animate, style, transition, state} from '@angular/animations';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardButton, CardEvent} from '../../interfaces/card.interface';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/first';

@Component({
    selector: 'bb-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    animations: [
        trigger('modalState', [
            state('inactive', style({transform: 'scale(0.95)', opacity: 0})),
            state('active', style({transform: 'none', opacity: 1})),

            transition('inactive => active', animate(`220ms cubic-bezier(0.0, 0.0, 0.2, 1)`)),
            transition('active => inactive', animate(`220ms cubic-bezier(0.0, 0.0, 0.2, 1)`)),

            transition('inactive => void', [animate(220, style({
                transform: 'scale(0.95)',
                opacity: 0
            }))]),
            transition('void => active', [style({
                transform: 'scale(0.95)',
                opacity: 0
            }), animate(110)])
        ]),
        trigger('modalWrapperState', [
            state('inactive', style({opacity: 0})),
            state('active', style({opacity: 1})),

            transition('inactive => active', animate(`220ms cubic-bezier(0.0, 0.0, 0.2, 1)`)),
            transition('active => inactive', animate(`220ms cubic-bezier(0.0, 0.0, 0.2, 1)`)),

            transition('inactive => void', [animate(220, style({opacity: 0}))]),
            transition('void => active', [style({opacity: 0}), animate(220)])
        ])]
})

export class ModalComponent implements OnInit {

    public initial = false;
    public state = 'inactive';
    public wrapperState = 'active';

    // Inputs.
    @Input() public out = true;
    @Input() public overflow = true;
    @Input() public boilerplate = true;
    @Input() public back: string;
    @Input() public title: string;
    @Input() public modifier: string;
    @Input() public wait: Observable<any>;
    @Input() public leftButtonBar: CardButton[];

    // Outputs.
    @Output() public onButtonClicked = new EventEmitter<CardEvent>();

    public constructor(private router: Router) {
    }

    public ngOnInit(): void {
        if (this.wait) {
            this.wait.first().subscribe(() => {
                this.state = 'active';
                this.initial = true;
            });
        } else {
            this.state = 'active';
            this.initial = true;
        }
    }

    public onClickOutside(event: Object): void {
        if (event
            && this.back
            && event['value'] === true
            && typeof event['target'].className === 'string'
            && event['target'].className.includes('modal__wrapper')
            && this.out) {
            this.quit();
        }
    }

    public onClick(event: CardEvent): void {
        if (event.id === 'goBackModal') {
            this.quit();
            return;
        }

        this.onButtonClicked.emit(event);
    }

    public animationDone($event): void {
        if ($event.fromState === 'void' || $event.toState !== 'inactive') {
            return;
        }

        this.router.navigate([this.back]).then(_ => _);
    }

    public quit(): void {
        this.state = 'inactive';
        this.wrapperState = 'inactive';
    }

}
