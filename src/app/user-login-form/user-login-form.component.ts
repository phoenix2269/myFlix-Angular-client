import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialogRef } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void { }

  /**
   * on login token, userdata, and Username will be stored in localstorage. 
   * user will be sent to the movie page 
   */

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((data) => {
      
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token);
      localStorage.setItem('Username', data.user.Username)

      this.dialogRef.close();
      console.log(data);
      this.snackBar.open('you\'ve been logged in', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (data) => {
      console.log(data);
      this.snackBar.open('sorry, something went wrong. please try again', 'OK', {
        duration: 2000
      });
    })
  }
}