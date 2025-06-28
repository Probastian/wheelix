import {Component, EventEmitter, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-tabs',
  imports: [
    NgTemplateOutlet,
    Button
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
