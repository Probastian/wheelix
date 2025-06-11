import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TabsComponent} from './components/tabs.component/tabs.component';
import {NavbarComponent} from './components/navbar.component/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabsComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'wheelix';
}
