import {Routes} from '@angular/router';
import {ToeComponent} from './components/modes/toe/toe.component';
import {CamberComponent} from './components/modes/camber/camber.component';

export const routes: Routes = [
  { path: '', redirectTo: 'toe', pathMatch: 'full' },
  { path: 'toe', component: ToeComponent },
  { path: 'camber', component: CamberComponent },
];
