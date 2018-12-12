import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Capacity} from '../../models/capacity.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CapacitiesService {

    constructor(private http: HttpClient) {
    }

    public get(id: number): Observable<Capacity> {
        return this.http.get<Capacity>(`http://localhost:3000/capacities/${id}`);
    }

    public list(): Observable<Capacity[]> {
        return this.http.get<Capacity[]>(`http://localhost:3000/capacities`);
    }

}
