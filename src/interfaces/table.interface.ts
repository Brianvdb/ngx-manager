import {TemplateRef} from '@angular/core';

export interface TableRow {
    label: string;
    fit?: boolean;
    flow?: string;
    property?: string;
    templateRef?: TemplateRef<any>;
}