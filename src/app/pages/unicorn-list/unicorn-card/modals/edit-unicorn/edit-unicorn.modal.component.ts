import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Unicorn} from '../../../../../models/unicorn.model';
import {UnicornsService} from '../../../../../shared/services/unicorns.service';
import {mergeMap} from 'rxjs/operators';

@Component({
    selector: 'uni-edit-unicorn',
    templateUrl: './edit-unicorn.modal.component.html',
    styleUrls: ['./edit-unicorn.modal.component.scss']
})
export class EditUnicornComponent {

    constructor(private unicornService: UnicornsService,
                private dialogRef: MatDialogRef<EditUnicornComponent>,
                private snackBar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA) public unicorn: Unicorn) {
    }

    public saveUnicorn(unicorn: Unicorn): void {
        this.unicornService.updateUnicorn(unicorn).pipe(
            mergeMap(updatedUnicorn => this.unicornService.setCapacitiesOnUnicorn(updatedUnicorn))
        ).subscribe((updatedUnicornWithCapacities) => {
            this.dialogRef.close(updatedUnicornWithCapacities);
            this.snackBar.open('✅✅✅');
        }, () => {
            this.snackBar.open('💥💥💥');
        });
    }
}
