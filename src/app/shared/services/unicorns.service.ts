import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Unicorn} from '../../models/unicorn.model';
import {from, Observable, Subject} from 'rxjs';
import {filter, flatMap, map, mergeMap, pluck, reduce, toArray} from 'rxjs/operators';
import {CapacitiesService} from './capacities.service';
import {Capacity} from '../../models/capacity.model';
import io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class UnicornsService {


    constructor(private http: HttpClient,
                private capacitiesService: CapacitiesService) {
    }

    public getUnicorns(): Observable<Unicorn[]> {
        return this.http.get<Unicorn[]>('http://localhost:3000/unicorns');
    }

    public updateUnicorn(unicorn: Unicorn): Observable<Unicorn> {
        delete unicorn.capacitiesLabels;
        return this.http.put<Unicorn>(`http://localhost:3000/unicorns/${unicorn.id}`, unicorn);
    }


    public getUnicorn(id: number): Observable<Unicorn> {
        return this.http.get<Unicorn>(`http://localhost:3000/unicorns/${id}`);
    }

    public deleteUnicorn(unicorn: Unicorn): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/unicorns/${unicorn.id}`);
    }

    public getUnicornsWithOneYear(): Observable<Unicorn[]> {
        return this.getUnicorns().pipe(
            flatMap(e => e),
            filter(u => new Date().getFullYear() - u.birthyear >= 1),
            map(unicorn => ({...unicorn, name: unicorn.name.toUpperCase()})),
            toArray(),
        );
    }

    public getAverageAge(): Observable<number> {
        return this.http.get<Unicorn[]>('http://localhost:3000/unicorns').pipe(
            flatMap(e => e),
            pluck('birthyear'),
            map((birthyear: number): number => new Date().getFullYear() - birthyear),
            reduce((acc: { count: number, sum: number }, age: number) => {
                return {
                    count: acc.count + 1,
                    sum: acc.sum + age,
                };
            }, {count: 0, sum: 0}),
            map(acc => acc.sum / acc.count),
        );
    }

    public getUnicornsWithCapacities(): Observable<Unicorn[]> {
        return this.getUnicorns().pipe(
            flatMap(e => e),
            mergeMap((unicorn: Unicorn): Observable<Unicorn> => {
                return this.setCapacitiesOnUnicorn(unicorn);
            }),
            toArray(),
        );
    }

    public setCapacitiesOnUnicorn(unicorn: Unicorn): Observable<Unicorn> {
        return from(unicorn.capacities).pipe(
            mergeMap((capacityId: number): Observable<Capacity> => {
                return this.capacitiesService.get(capacityId);
            }),
            pluck('label'),
            toArray(),
            map((labels: string[]): Unicorn => {
                return {...unicorn, capacitiesLabels: labels};
            }),
        );
    }

    public getCounter(): Subject<number> {
        const socket = io('http://localhost:3100');
        const observable = new Observable((obs: any) => {
            socket.on('count', (data) => {
                console.log('Received message from Websocket Server');
                obs.next(data);
            });
            return () => {
                socket.disconnect();
            };
        });
        const observer = {
            next: (data: Object) => {
                socket.emit('message', JSON.stringify(data));
            },
        };
        return Subject.create(observer, observable);
    }

}
