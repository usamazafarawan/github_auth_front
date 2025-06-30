
       import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { RouterOutlet, RouterModule, Router } from "@angular/router";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';


/** @title Responsive sidenav */
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule
  ],
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, OnDestroy {
  selectedTab: string = "discover";
  navItems: any =     [ {
            "Title": "Grid List",
            "isNested": "true",
            "Icon2": "./assets/icons/sidenavIcons.svg#business",
            "Route": "dashboard",
            "end": "false",
            "child": [
                {
                     "Title": "Remove Integration",
            "Icon": "user-xmark",
                },
                {
                    "Title": "Re-sync Integration",
            "Icon": "rotate",
                } ,
                   {
                    "Title": "Log Out",
            "Icon": "right-from-bracket",
                } 
            ]
        }];
  childNavs: any;
  mainNavs: any;
  endNavs: any;
  today = new Date();
  showDateFields: boolean = true;

  toggleDateFields() {
    this.showDateFields = !this.showDateFields;
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 768px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    let url= this.router.url
    url = url.split('/')[1]
    console.log(url);
    this.selectedTab = url  
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.router.navigate([tab]);
  }
  navigateToChild(route: string, parentRoute: string, childRoute: string, childTitle: string) {
  if (route) {
    this.router.navigate([route]);
  };
  this.selectedPhases[parentRoute] = childTitle;

}


  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  activeMenu: string | null = null; // Tracks which menus are open
  isSidebarCollapsed = false;
   

  // toggleMenu(id: string): void {
  //   this.activeMenu = this.activeMenu === id ? null : id;
  // }
   
 

 
  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.childNavs = this.navItems.filter(
      (item: any) => item.isNested === "true"
    );
  

      this.activeMenu = '';
    
 
       // Check if the current selected tab is 'phase' or 'strategy'
  let url = this.router.url;
  url = url.split('/')[1];  // Get the first part of the URL path
  console.log(url);
  this.selectedTab = url;

  // Ensure that the 'phase' (or strategy) menu is closed by default
  if (this.selectedTab === '') {
    this.activeMenu = null;  // Close the phase menu by default
  }
  
    
  }

  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
      // this.router.navigate(['/home']); // <-- Adjust this to match your actual home route

  }
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) =>
    h.test(window.location.host)
  );
   // Track expanded/collapsed menu states per route
  menuStates: { [key: string]: boolean } = {};

  // Toggle menu for a given route key
  toggleMenu(route: string): void {
    this.menuStates[route] = !this.menuStates[route];
  }

selectedPhases: { [parentRoute: string]: string } = {};



 
}