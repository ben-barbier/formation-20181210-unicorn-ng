import {Component} from '@angular/core';
import {Unicorn} from '../../models/unicorn.model';
import {UnicornsService} from '../../shared/services/unicorns.service';

@Component({
    selector: 'uni-unicorn-list',
    templateUrl: './unicorn-list.component.html',
    styleUrls: ['./unicorn-list.component.scss']
})
export class UnicornListComponent {

    public unicorns: Unicorn[];

    constructor(private unicornsService: UnicornsService) {
        this.unicornsService.getUnicornsWithCapacities().subscribe(
            (unicorns) => this.unicorns = unicorns);
    }

    public displayHello(unicorn: Unicorn): void {
        alert(unicorn.name);
    }

    public removeFromList(unicorn: Unicorn): void {
        this.unicorns = this.unicorns.filter(u => u.id !== unicorn.id);
    }
}
