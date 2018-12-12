import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Unicorn} from '../../../models/unicorn.model';
import {UnicornsService} from '../../../shared/services/unicorns.service';
import {CartService} from '../../../shared/services/cart.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {EditUnicornComponent} from './modals/edit-unicorn/edit-unicorn.modal.component';

@Component({
    selector: 'uni-unicorn-card',
    templateUrl: './unicorn-card.component.html',
    styleUrls: ['./unicorn-card.component.scss']
})
export class UnicornCardComponent {

    @Input()
    public unicorn: Unicorn;

    @Output()
    private sayHello = new EventEmitter<string>();

    @Output()
    private deleted = new EventEmitter();

    constructor(private unicornsService: UnicornsService,
                private cartService: CartService,
                private snackBar: MatSnackBar,
                private dialog: MatDialog) {
    }

    public doSayHello() {
        this.sayHello.emit('COUCOUCOUCOU');
    }

    public delete(unicorn: Unicorn) {
        this.unicornsService.deleteUnicorn(unicorn).subscribe(() => {
            this.snackBar.open(`🦄 ${unicorn.name} a été supprimée 🔥🔥🔥...`);
            this.deleted.emit();
        }, () => {
            this.snackBar.open(`💥💥💥 Oups, il y a eu une erreur 💥💥💥`);
        });
    }

    public addToCart(unicorn: Unicorn): void {
        this.cartService.cart.next(this.cartService.cart.getValue().concat(unicorn));
    }

    public edit(unicorn: Unicorn): void {
        this.dialog.open(EditUnicornComponent, {
            data: {...unicorn},
        }).afterClosed().subscribe((updatedUnicornOrNull) => {
            if (updatedUnicornOrNull) {
                this.unicorn = updatedUnicornOrNull;
            }
        });
    }
}
