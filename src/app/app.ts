import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TabsComponent} from './components/tabs/tabs.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SensorsService} from './service/sensor.service';
import {ConfirmDialog, ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-root',
  providers: [ConfirmationService, ConfirmDialogModule],
  imports: [RouterOutlet, TabsComponent, NavbarComponent, ConfirmDialog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
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
