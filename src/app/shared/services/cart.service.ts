import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Unicorn} from '../../models/unicorn.model';
import {map, pluck} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    public cart: BehaviorSubject<Unicorn[]> = new BehaviorSubject([]);

}
