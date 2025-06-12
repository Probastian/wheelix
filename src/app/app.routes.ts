import { Routes } from '@angular/router';
import {ToeComponent} from './components/modes/toe/toe.component';

export const routes: Routes = [
  { path: '', redirectTo: 'toe', pathMatch: 'full' },
  { path: 'toe', component: ToeComponent },
];
