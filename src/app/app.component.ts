import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { FlowbiteService } from './core/services/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'graphlogicng';
  selectedTab: string = 'dashboard';
  constructor(private flowbiteService: FlowbiteService,
  ) {}


  ngOnInit(): void {
    // this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    // });
  }
}
