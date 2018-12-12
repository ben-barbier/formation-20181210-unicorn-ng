import {Component} from '@angular/core';
import {Unicorn} from '../../models/unicorn.model';
import {ActivatedRoute} from '@angular/router';
import {UnicornsService} from '../../shared/services/unicorns.service';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Component({
    selector: 'uni-unicorn-details',
    templateUrl: './unicorn-details.component.html',
    styleUrls: ['./unicorn-details.component.scss']
})
export class UnicornDetailsComponent {

    public unicorn: Observable<Unicorn>;

    constructor(route: ActivatedRoute,
                unicornService: UnicornsService) {
        this.unicorn = route.params.pipe(
            mergeMap(params => unicornService.getUnicorn(params.id)),
        );

    }

}
