import {Component, EventEmitter, Output} from '@angular/core';
import {Card} from 'primeng/card';
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {CalendarIcon, EyeIcon, HomeIcon, SearchIcon, WindowMaximizeIcon} from 'primeng/icons';
import {Toolbar} from 'primeng/toolbar';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-tabs',
  imports: [
    Toolbar,
    NgTemplateOutlet,
    Button,
    WindowMaximizeIcon
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  standalone: true,
})
export class TabsComponent {
  @Output() tabChange = new EventEmitter<string>();

  switchTab(tab: string) {
    this.tabChange.emit(tab);
  }
}
