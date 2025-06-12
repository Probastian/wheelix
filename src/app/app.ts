import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TabsComponent} from './components/tabs/tabs.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SensorsService} from './service/sensor.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabsComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected title = 'wheelix';

  constructor(
    readonly sensorsService: SensorsService,
  ) { }

  ngOnInit(): void {
      this.sensorsService.startSensors().then(r => {});
  }

  ngOnDestroy(): void {
      this.sensorsService.stopSensors();
  }
}
