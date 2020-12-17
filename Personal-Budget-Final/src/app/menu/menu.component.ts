import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor (private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }
  logout() {
    this.authenticationService.logout();
  }
  getAuthenticatedUser() {
    return this.authenticationService.currentUserValue;
  }
}
