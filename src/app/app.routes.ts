import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";
import { LoginPageComponent } from "../app/pages/login-page/login-page.component";
export const routes: Routes = [

  {
    path: "login",
    component: LoginPageComponent,
  },

  {
    path: "dashboard",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./features/sol/sol.component").then((m) => m.SolComponent),
      },
    ],
  },
 
  { path: "**", redirectTo: "login" },
];
