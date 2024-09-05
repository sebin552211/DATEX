import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthComponent } from './auth/auth.component';


export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    
      },
      {
        path: 'voc-analysis',
        loadComponent: () => import('./pages/voc-analysis/voc-analysis.component').then((m) => m.VocAnalysisComponent),
    
      },
      {
        path: 'voc-status',
        loadComponent: () => import('./pages/voc-status/voc-status.component').then((m) => m.VocStatusComponent),
    
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
