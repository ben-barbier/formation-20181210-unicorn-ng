import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Unicorn} from '../../../models/unicorn.model';

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

    public doSayHello() {
        this.sayHello.emit('COUCOUCOUCOU');
    }
}
