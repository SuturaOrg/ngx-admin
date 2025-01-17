import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { AdvancedModule} from '../advanced/advanced.module';
import { AdherentsRoutingModule } from './adherents-routing.module';
import { AdherentsComponent } from './adherents.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    AdvancedModule,
    AdherentsRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
   AdherentsComponent,
  ],
})
export class AdherentsModule { }
