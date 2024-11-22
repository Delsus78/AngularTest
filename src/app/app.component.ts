import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { Subscription } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {

  private router = inject(Router);
  loginService = inject(LoginService);

  private logoutSubscription: Subscription | null = null;

  logout() {
    this.logoutSubscription = this.loginService.logout().subscribe({
      next: () => {
        this.navigateLogin();
      },
      error: (error: any) => {
        this.navigateLogin();
      }
    });
  }


  navigateHome() {
    this.router.navigate(['home']);
  }

  navigateLogin() {
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.logoutSubscription?.unsubscribe();
  }

}
