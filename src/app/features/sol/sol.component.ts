import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SearchBarComponent } from "../../shared/ui/search-bar/search-bar.component";
import { AgGridModule } from "ag-grid-angular";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { MainRequestServiceService } from "../../core/services/main-request-service.service";
import { HttpClientModule } from "@angular/common/http";

// Register AG Grid community modules globally
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: "app-sol",
  standalone: true,
  imports: [CommonModule, SearchBarComponent, AgGridModule, HttpClientModule],
  templateUrl: "./sol.component.html",
  styleUrls: ["./sol.component.scss"],
})
export class SolComponent {
  data: any[] = []
  breadCrumb: string[] = [];
  selectedTab: string = "";

  // AG Grid row data and column definitions
  rowData: any[] = [];
  columnDefs: any[] = [];

  // ⚙️ Default AG Grid column configuration
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  // 🧠 Holds reference to AG Grid API
  gridApi: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private mainService: MainRequestServiceService
  ) {
    // Fetch all repositories (optional: for dropdowns or debugging)
    this.mainService.getRepos().subscribe((repos) => {
      console.log("repos: ", repos);
    });

    // Load commits for a specific repo statically (kamal-no-bot / Cordato-Web)
    this.mainService
      .getCommits("alamin-hridoy", "graphlogicng")
      .subscribe((commits) => {
        // nested GitHub commit objects to a table-friendly format
        const flattenedCommits = commits.map((commit) => ({
          sha: commit.sha,
          author_name: commit.commit.author?.name,
          author_email: commit.commit.author?.email,
          date: commit.commit.author?.date,
          message: commit.commit.message,
          url: commit.html_url,
        }));

        setTimeout(() => {
          this.rowData = flattenedCommits;
          this.columnDefs = this.generateDynamicColumns(flattenedCommits);
        }, 0);
      });
  }

  ngOnInit(): void {
    this.breadCrumb = ["Dashboard", "Grid List"];
  }

  selectTab(event: any): void {
    this.selectedTab = event;
  }

  // 🔄 Called when AG Grid is ready
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  // 🔍 Global search filter for AG Grid
  onGlobalSearch(event: any) {
    this.gridApi.setQuickFilter(event.target.value);
  }

  // Dynamically create columns based on data keys (handles nested + arrays)
  generateDynamicColumns(data: any[]): any[] {
    if (!data || data.length === 0) return [];

    return Object.keys(data[0]).map((key) => ({
      headerName: key.toUpperCase(),
      field: key,
      filter: true,
      sortable: true,
      resizable: true,
      valueGetter: (params: any) => {
        const val = params.data[key];
        return Array.isArray(val)
          ? val.join(", ")
          : typeof val === "object"
          ? JSON.stringify(val)
          : val ?? "";
      },
    }));
  }

  // Triggers GitHub OAuth login via backend
  connectToGitHub() {
    window.location.href = "http://localhost:3000/api/github/login";
  }

  goToDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  goToDetail() {
    this.router.navigate(["/detail"]);
  }
}
