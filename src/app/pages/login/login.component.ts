import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthComponent } from '../../auth/auth.component';
import { Component, inject, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus, AuthenticationResult } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent, NgIf, FormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class LoginComponent implements OnInit, OnDestroy{
  loginDisplay: boolean = false;
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  // isIframe = false;

  // private readonly _destroying$ = new Subject<void>();
 
  ngOnInit(): void {
    // Handle redirect and store token if available
    // this.authService.handleRedirectObservable().subscribe((response: AuthenticationResult) => {
    //   if (response && response.accessToken) {
    //     console.log('Login successful', response);
    //     localStorage.setItem('loginToken', response.accessToken);
    //     this.router.navigate(['/auth']);  //for logging automitcally in next login
    //   }
    // });

    // this.isIframe = window !== window.parent && !window.opener;

    // this.setLoginDisplay();
    // this.authService.instance.enableAccountStorageEvents();  //msal listens to storage events for tokens

    // this.msalBroadcastService.inProgress$
    //   .pipe(
    //     filter((status: InteractionStatus) => status === InteractionStatus.None),
    //     takeUntil(this._destroying$)
    //   )
    //   .subscribe(() => {
    //     this.setLoginDisplay();
    //     this.checkAndSetActiveAccount();
    //   });

    // this.checkAndSetActiveAccount();
  }

  setLoginDisplay() {
    // this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    // const activeAccount = this.authService.instance.getActiveAccount();
    // if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
    //   const account = this.authService.instance.getAllAccounts()[0];
    //   this.authService.instance.setActiveAccount(account);
      
    //   // Acquire token silently
    //   this.authService.acquireTokenSilent({
    //     scopes: ["user.read"],
    //     account: account
    //   }).subscribe({
    //     next: (response: AuthenticationResult) => {
    //       if (response && response.accessToken) {
    //         localStorage.setItem('loginToken', response.accessToken);
    //         console.log('Token acquired silently', response.accessToken);
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Silent token acquisition failed', error);
    //     }
    //   });
    // }
  }

  router = inject(Router);

  login() {
    const validUsername = 'Datex';
    const validPassword = 'Datex@123';
    if (this.username === validUsername && this.password === validPassword){
      this.router.navigateByUrl('/app/dashboard');
    }
    else {
      alert('Invalid username or password');
    }
    // this.authService.loginRedirect(this.msalGuardConfig.authRequest as any);
  }

  logout() {
    // this.authService.logoutRedirect();
  }
  ngOnDestroy(): void {
    // this._destroying$.next(undefined);
    // this._destroying$.complete();
  }
}
