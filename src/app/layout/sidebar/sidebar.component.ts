
       import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from "@angular/core";
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
import { AddDataDialogComponent } from "../../shared/ui/add-data-dialog/add-data-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { SharedService } from "../../core/services/flowbite.service";
import { ToastrService } from "ngx-toastr";


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
            "index":1
                },
                {
                    "Title": "Re-sync Integration",
            "Icon": "rotate",
            "index":2
                } ,
                   {
                    "Title": "Log Out",
            "Icon": "right-from-bracket",
            "index":3
                } 
            ]
        }];
  childNavs: any;
  mainNavs: any;
  endNavs: any;
  today = new Date();
  showDateFields: boolean = true;
  dialog1 = inject(MatDialog);


  toggleDateFields() {
    this.showDateFields = !this.showDateFields;
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private router: Router,
    private sharedService:SharedService,
        private toastr: ToastrService,

  ) {
    this.mobileQuery = media.matchMedia("(max-width: 768px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

 
  navigateToChild(child:any) {
  if (child.index == 3) {
      this.router.navigate(['']);
  }
   this.openDialog(child.index == 1 ? "Remove Integration":child.index == 2? "Re-sync Integration":'' )
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



openDialog(type:string) {
  if(type){
  const dialogRef = this.dialog1.open(AddDataDialogComponent, {
    height: 'auto',
    width: '25%',
    panelClass: 'custom-dialog-panel',
    data: {
      type: type
    },
  });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (type == 'Remove Integration') {
          this.sharedService.revoke();
        }
        else {
          this.toastr.success("Successfully", 'Account Re-sync')
        }
      }
    });
  }

}

 
}