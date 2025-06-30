import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { sol } from "../../../data.json";
import { ToastrService } from 'ngx-toastr';
import { SearchBarComponent } from '../../shared/ui/search-bar/search-bar.component';


@Component({
  selector: 'app-sol',
  standalone: true,
  imports: [CommonModule ,SearchBarComponent ],
  templateUrl: './sol.component.html',
  styleUrls: ['./sol.component.scss']
})
export class SolComponent {
  data: any[] = []; // Or your actual data type
  breadCrumb: string[] = []; // Or correct structure
  selectedTab: string = ''; // or number, depending on your logic

  selectTab(event: any): void {
    this.selectedTab = event;
  }
  ngOnInit(): void {
    this.breadCrumb = [
            "Dashboard",
            "Grid List"
      ];

  }

  
   constructor(private router: Router,private toastr: ToastrService) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToDetail() {
    this.router.navigate(['/detail']);
  }


    
}
