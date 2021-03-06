import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComposeMessageComponent } from '@nx-angular-router-project/shared/ui-dialogs';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SelectivePreloadingStrategyService } from '@nx-angular-router-project/shared/data-access-navigation';
import { AuthGuard } from '@nx-angular-router-project/shared/data-access-security';

const appRoutes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup',
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@nx-angular-router-project/admin/feature-page').then(
        (m) => m.AdminFeaturePageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'crisis-center',
    loadChildren: () =>
      import('@nx-angular-router-project/crisis-center/feature-page').then(
        (m) => m.CrisisCenterFeaturePageModule
      ),
    data: { preload: true },
  },
  { path: '', redirectTo: '/superheroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategyService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
