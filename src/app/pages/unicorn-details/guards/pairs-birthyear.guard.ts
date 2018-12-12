import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UnicornsService} from '../../../shared/services/unicorns.service';
import {map, pluck, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class PairsBirthyearGuard implements CanActivate {

    constructor(private unicornService: UnicornsService,
                private router: Router,
                private snackBar: MatSnackBar) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.unicornService.getUnicorn(next.params.id).pipe(
            pluck('birthyear'),
            map((birthyear: number) => !(birthyear % 2)),
            tap((canActivate: boolean) => {
                if (!canActivate) {
                    this.router.navigate(['']);
                    this.snackBar.open(`⚠️ Vous n'avez pas le droit de voir cette page... OUST !`);
                }
            }),
        );
    }

}
