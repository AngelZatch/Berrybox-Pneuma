import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { JukeboxModule } from '../jukebox/jukebox.module';

import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { BoxesManagerComponent } from './components/boxes-manager/boxes-manager.component';
import { AclManagerComponent } from './components/acl-manager/acl-manager.component';

@NgModule({
    declarations: [
        AdminPanelComponent,
        BoxesManagerComponent,
        AclManagerComponent,
    ],
    imports: [
        AdminRoutingModule,
        SharedModule,
        JukeboxModule
    ]
})
export class AdminModule { }
