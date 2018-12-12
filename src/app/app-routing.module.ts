import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnicornListComponent} from './pages/unicorn-list/unicorn-list.component';
import {UnicornDetailsComponent} from './pages/unicorn-details/unicorn-details.component';
import {PairsBirthyearGuard} from './pages/unicorn-details/guards/pairs-birthyear.guard';

const routes: Routes = [
    {path: '', component: UnicornListComponent},
    {
        path: 'details/:id',
        component: UnicornDetailsComponent,
        canActivate: [PairsBirthyearGuard]
    },
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
