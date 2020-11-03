import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ComponentsModule } from '../components/components.module';

import { routes } from './routes';

@NgModule({
    declarations: [
        // for components
    ],
    imports: [
        // for modules
        CommonModule,
        FormsModule,
        RouterModule.forRoot(routes, { useHash: true }),
        ModalModule.forRoot(),
        ComponentsModule
    ],
    exports: [
        // for modules
        CommonModule,
        FormsModule,
        RouterModule,
        ModalModule,
        ComponentsModule
    ],
    providers: [
        // for services
    ],
})
export class RoutesModule { }
