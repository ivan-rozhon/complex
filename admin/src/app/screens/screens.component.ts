import { Component } from '@angular/core';

import { AuthService } from '@cx/core/services/auth.service';

@Component({
  selector: 'cx-screens',
  templateUrl: './screens.component.html',
  styleUrls: ['./screens.component.scss'],
})
export class ScreensComponent {
  constructor(private authService: AuthService) {}

  // Log out user (via auth service)
  logout(): void {
    this.authService.logout();
  }
}
