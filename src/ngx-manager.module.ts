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
    DatePickerComponent
} from './components';

import {TranslationsService} from './services';
import {ClickOutsideDirective} from './directives';
import {TranslatePipe} from './pipes';

import {LibraryConfig} from './interfaces/library-config.interface';

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
        TranslationsService
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
