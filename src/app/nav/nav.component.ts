import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UnicornsService} from '../shared/services/unicorns.service';
import {CartService} from '../shared/services/cart.service';
import {Unicorn} from '../models/unicorn.model';

@Component({
    selector: 'uni-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent {

    public avg: Observable<number> = this.unicornsService.getAverageAge();
    public cart: Observable<Unicorn[]> = this.cartService.cart;
    public counter: Observable<number> = this.unicornsService.getCounter();

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => result.matches)
    );

    constructor(private breakpointObserver: BreakpointObserver,
                private unicornsService: UnicornsService,
                private cartService: CartService) {
    }

}
