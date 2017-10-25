# `NGX-manager`
Simply add manager aspects to your Angular 4.0+ project. This library contains form elements such as input-wrapper/checkbox/radio/select. It also includes services for translating and notifying the user.

## <a name="get-started"></a> Get Started

### <a name="installation"></a> Installation

You can install this package locally with npm or yarn.

```bash
# To get the latest stable version

npm install @bravobit/ngx-manager ng-select ngx-cookie --save

# or

yarn add @bravobit/ngx-manager ng-select ngx-cookie
```

### <a name="usage"></a> Usage

You should import our global `styles.scss` file into your project to get the CSS resets and normalize.

```scss
@import '~@bravobit/ngx-manager/styles/styles.scss';
```

You should add the following imports to your imports array.

```typescript
imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
]
```

You should add the following declare module to the `typings.d.ts` file to be able to add languages to the `forRoot` method call.

```typescript
declare module '*.json' {
    const value: any;
    export default value;
}
```

After you have added this statement to the `typings.d.ts` file, you should be able to import JSON files into your project.
```typescript
import * as dutch from '../languages/dutch.language.json';
``` 

`NgxManagerModule` should be registered in the `AppModule` with `forRoot()` static method to get access to all our components/pipes/services/directives.

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {NgxManagerModule} from '@bravobit/ngx-manager';

import {AppComponent}  from './app.component';

import * as dutch from '../languages/dutch.language.json';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgxManagerModule.forRoot({
            languages: {nl: dutch}
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

### <a name="notifications"></a> Notifications

If you want to add notifications to your project you should add the `<bb-notifications></bb-notifications>` to your `app.component.html`

```html
<router-outlet></router-outlet>

<bb-notifications></bb-notifications>
```

## <a name="form-components"></a> Form components

### <a name="form-control"></a> Form-control

```html
<!-- Input (text/number/date/etc.) -->

<bb-form-control [label]="'My email input'" [icon]="'email'">
    <input [(ngModel)]="myEmail" placeholder="johndoe@gmail.com">
</bb-form-control>

<!-- Textarea -->

<bb-form-control [label]="'My email textarea'" [icon]="'email'">
    <textarea [(ngModel)]="myEmail" placeholder="johndoe@gmail.com" rows="10"></textarea>
</bb-form-control>
```

### <a name="select"></a> Select

```html
<!-- NgModel -->

<bb-select [(ngModel)]="select" [label]="'My form control'" [items]="[]"></bb-select>

<!-- Reactive forms -->

<bb-select [formControlName]="'select'" [label]="'My form control'" [items]="[]"></bb-select>
```

### <a name="checkbox"></a> Checkbox

```html
<!-- NgModel -->

<bb-checkbox [(ngModel)]="myCheckbox" [label]="'My checkbox'"></bb-checkbox>

<!-- Reactive forms -->

<form [formGroup]="form">
    <bb-checkbox [formControlName]="myCheckbox" [label]="'My checkbox'"></bb-checkbox>
</form>
```

### <a name="radio"></a> Radio

```html
<!-- NgModel -->

<bb-radio [(ngModel)]="gender" [name]="'gender'" [label]="'Male'" [value]="'male'"></bb-radio>
<bb-radio [(ngModel)]="gender" [name]="'gender'" [label]="'Female'" [value]="'female'"></bb-radio>
<bb-radio [(ngModel)]="gender" [name]="'gender'" [label]="'Male and female'" [value]="'both'"></bb-radio>

<!-- Reactive forms -->

<form [formGroup]="form">
    <bb-radio [formControlName]="'gender'" [name]="'gender'" [label]="'Male'" [value]="'male'"></bb-radio>
    <bb-radio [formControlName]="'gender'" [name]="'gender'" [label]="'Female'" [value]="'female'"></bb-radio>
    <bb-radio [formControlName]="'gender'" [name]="'gender'" [label]="'Male and female'" [value]="'both'"></bb-radio>
</form>
```

### <a name="buttons"></a> Buttons

```html
<!-- Default -->

<bb-button [value]="'Do something'"></bb-button>

<!-- Grouped -->

<bb-button-group [type]="'right'">
    <bb-button [color]="'grey'" [value]="'Reset'" [type]="'reset'"></bb-button>
    <bb-button [value]="'Submit'" [type]="'submit'"></bb-button>
</bb-button-group>
```

## <a name="structure-components"></a> Structure components

### <a name="card"></a> Card

```html
<bb-card [title]="'My card title'" [rightButtonBar]="[{id: 'delete', icon: 'delete'}]">
    <!-- Content -->
</bb-card>
```


## <a name="other"></a> Other

### <a name="translations"></a> Translations

The `TranslationsService` can be used by using the dependency injection in Angular.

```typescript
import {TranslationsService} from '@bravobit/ngx-manager';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    
    public constructor(private translations: TranslationsService) {
    }
    
    public ngOnInit(): void {
        // Set a new language.
        this.translations.use('de');
        
        // Translate a sentence.
        const translated = this.translations.instant('My form control placeholder');
    }
    
}
```

The `TranslationPipe` can be used in an Angular component template.

```html
{{ 'Hello world!' | translate }}
```
