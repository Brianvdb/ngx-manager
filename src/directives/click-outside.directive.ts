import {Directive, OnInit, OnDestroy, Output, EventEmitter, ElementRef} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Directive({
    selector: '[bbClickOutside]'
})
export class ClickOutsideDirective implements OnInit, OnDestroy {

    // Variables.
    private listening: boolean;

    // Subscriptions.
    private clickSubscription: Subscription;

    // Outputs.
    @Output('clickOutside') public clickOutside: EventEmitter<Object>;

    /**
     * Default constructor.
     *
     * @param element The element that the directive has been added to.
     */
    public constructor(private element: ElementRef) {
        this.listening = false;
        this.clickOutside = new EventEmitter();
    }

    /**
     * Gets triggered when the component is initialized.
     */
    public ngOnInit(): void {
        this.clickSubscription = Observable.fromEvent(document, 'click')
            .delay(1)
            .do(() => this.listening = true)
            .subscribe((event: MouseEvent) => this.onGlobalClick(event));
    }

    /**
     * Get triggered when the component is destroyed.
     */
    public ngOnDestroy(): void {
        this.clickSubscription.unsubscribe();
    }

    /**
     * Checks a global click.
     *
     * @param event The mouse event.
     */
    private onGlobalClick(event: MouseEvent) {
        if (event instanceof MouseEvent && this.listening === true) {
            this.clickOutside.emit({
                target: (event.target || null),
                value: !this.isDescendant(this.element.nativeElement, event.target)
            });
        }
    }

    /**
     * Checks if the node is a descendant.
     *
     * @param parent The parent element.
     * @param child The child element.
     *
     * @returns If an element is a descendant.
     */
    private isDescendant(parent, child): boolean {
        let node = child;

        while (node !== null) {
            if (node === parent) {
                return true;
            }

            node = node.parentNode;
        }

        return false;
    }
}
