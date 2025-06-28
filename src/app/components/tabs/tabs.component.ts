import {Component, EventEmitter, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {NgTemplateOutlet} from '@angular/common';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-tabs',
  imports: [
    NgTemplateOutlet,
    Button,
    RouterModule
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  standalone: true,
})
export class TabsComponent {
  @Output() tabChange = new EventEmitter<string>();

  constructor(
    readonly router: Router,
  ) { }

  switchTab(tab: string) {
    // this.tabChange.emit(tab);
    console.log(`Routing to tab '/${tab}'`);
    this.router.navigate([`/${tab}`]);
  }
}
