import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { MainRequestServiceService } from './main-request-service.service';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from '../../shared/resources/apiResource';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private mainRequestService: MainRequestServiceService,
    private toastr: ToastrService,
  ) { }

 

  /**
   * SignUp Data 
   */

  logInInfo(loginInfo: any) {
    return this.mainRequestService.addData(`${ApiUrl.adminLogInApi}`, loginInfo).pipe(catchError(err => {
      console.log("error", err)
      const message = err.error?.message || 'An error has occured.';
      this.toastr.error(message);
      return EMPTY;
    }));
  }




} 
