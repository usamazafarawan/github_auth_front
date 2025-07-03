import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MainRequestServiceService } from './main-request-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private router: Router,private mainRequestServiceService:MainRequestServiceService,    private toastr: ToastrService,
  ) { }


  revoke() {


this.mainRequestServiceService.signoutGithub().subscribe({
  next: (data) => {
    if (data) {
      this.toastr.success('Account Removed','Successfully')
      this.router.navigate(['']);
    }
  },
  error: (err) => {
    console.error('Signout failed:', err);
      this.toastr.error('Error','Failed to remove account')
  }
})

  }

}