import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MainRequestServiceService } from './main-request-service.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private router: Router,private mainRequestServiceService:MainRequestServiceService
  ) { }


  logout() {


this.mainRequestServiceService.signoutGithub().subscribe({
  next: (data) => {
    if (data) {
      this.router.navigate(['']);
    }
  },
  error: (err) => {
    console.error('Signout failed:', err);
    // Optionally show a user-friendly message
  }
})

  }

}