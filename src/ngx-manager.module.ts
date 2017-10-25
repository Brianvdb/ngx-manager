import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CookieModule} from 'ngx-cookie';
import {SelectModule} from 'ng-select';

import {
    FormControlComponent,
    CheckboxComponent,
    RadioComponent,
    SelectComponent,
    ButtonComponent,
    ButtonGroupComponent,
    CardComponent,
    ModalComponent,
    DatePickerComponent,
    TableComponent,
    NotificationsComponent
} from './components';

import {
    TranslationsService,
    NotificationsService
} from './services';

import {ClickOutsideDirective} from './directives';
import {TranslatePipe} from './pipes';

import {LibraryConfig} from './interfaces/library-config.interface';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';

@NgModule({
    declarations: [
        // Components.
        FormControlComponent,
        CheckboxComponent,
        RadioComponent,
        SelectComponent,
        ButtonComponent,
        ButtonGroupComponent,
        CardComponent,
        ModalComponent,
        DatePickerComponent,
        TableComponent,
        NotificationsComponent,
        // Directives.
        ClickOutsideDirective,
        // Pipes.
        TranslatePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CookieModule.forRoot(),
        SelectModule
    ],
    providers: [
        TranslationsService,
        NotificationsService
    ],
    exports: [
        // Imports.
        CookieModule,

        // Components.
        FormControlComponent,
        CheckboxComponent,
        RadioComponent,
        SelectComponent,
        ButtonComponent,
        ButtonGroupComponent,
        CardComponent,
        ModalComponent,
        DatePickerComponent,
        TableComponent,
        NotificationsComponent,
        // Directives.
        ClickOutsideDirective,
        // Pipes.
        TranslatePipe
    ]
})
export class NgxManagerModule {

    public static forRoot(config: LibraryConfig): ModuleWithProviders {
        return {
            ngModule: NgxManagerModule,
            providers: [
                {provide: LibraryConfig, useValue: config}
            ]
        };
    }

    public constructor(@Optional() @SkipSelf() parentModule: NgxManagerModule) {
        if (parentModule) {
            throw new Error('NgxManagerModule is already loaded. Import it in the AppModule only');
        }
    }

}
