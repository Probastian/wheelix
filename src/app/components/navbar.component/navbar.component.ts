import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {Menubar} from 'primeng/menubar';
import {provideAnimations} from '@angular/platform-browser/animations';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {Select, SelectChangeEvent} from 'primeng/select';

@Component({
  selector: 'app-navbar',
  imports: [
    FormsModule,
    DropdownModule,
    Menubar,
    Toolbar,
    Button,
    IconField,
    InputIcon,
    Select
  ],
  animations: [

  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
})
export class NavbarComponent {
  carOptions = [
    { name: 'BMW M3', code: 'm3' },
    { name: 'Audi RS6', code: 'rs6' },
    { name: 'Porsche 911', code: '911' }
  ];

  selectedCar: any = null;

  onCarSelectionChange($event: SelectChangeEvent) {

  }
}
