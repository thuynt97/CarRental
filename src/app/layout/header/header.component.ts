import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { MatDialog } from '@angular/material';
import { RegisterUserComponent } from 'src/app/pages/register-user/register-user.component';
import { UserInfo } from 'src/app/model/UserInfo';
import { TokenStorage } from 'src/app/common/token.storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  currentUser: UserInfo;

  constructor(public dialog: MatDialog,
    private tokenStorage: TokenStorage) {}

  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem("UserCurrent"));
  }
  
  openDialog(): void {
    
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px',
      height: '450px',
      panelClass: 'my-class',
      data: {}
    });
    
    dialogRef.afterClosed().subscribe(() =>
      window.location.reload()
    );
  }
  logout(){
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
