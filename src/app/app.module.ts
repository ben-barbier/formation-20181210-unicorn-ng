import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UnicornCardComponent} from './pages/unicorn-list/unicorn-card/unicorn-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MAT_DIALOG_DEFAULT_OPTIONS,
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
    MatButtonModule,
    MatCardModule,
    MatDialogModule, MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule
} from '@angular/material';
import {NavComponent} from './nav/nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {UnicornListComponent} from './pages/unicorn-list/unicorn-list.component';
import {HttpClientModule} from '@angular/common/http';
import {MagicalNamePipe} from './shared/pipes/magical-name.pipe';
import {UnicornDetailsComponent} from './pages/unicorn-details/unicorn-details.component';
import {EditUnicornComponent} from './pages/unicorn-list/unicorn-card/modals/edit-unicorn/edit-unicorn.modal.component';
import {FormsModule} from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        UnicornCardComponent,
        NavComponent,
        UnicornListComponent,
        MagicalNamePipe,
        UnicornDetailsComponent,
        EditUnicornComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        HttpClientModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: true}}
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        EditUnicornComponent,
    ]
})
export class AppModule {
}
