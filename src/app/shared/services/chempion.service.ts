import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { empty, map, Observable, of } from "rxjs";
import { Chempion } from "src/app/core/models/chempion";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ChempionService{

    private defaultHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    private httpOptions = {
        headers: this.defaultHeaders
    }
    private baseUrl = `${environment.apiRootUrl}chempions`;

    constructor(private http: HttpClient){}

    create(model: Chempion): Observable<Chempion>{
        return this.http.post<Chempion>(`${this.baseUrl}`, model, {observe: 'response', headers: this.defaultHeaders})
            .pipe(
                map(response => {
                    return response.body as Chempion
                })
            )
    }

    update(model: Chempion): Observable<Chempion>{
        return this.http.put<Chempion>(`${this.baseUrl}`, model, {observe: 'response', headers: this.defaultHeaders})
            .pipe(
                map(response => {
                    return response.body as Chempion
                })
            )
    }

    getAll(): Observable<Chempion[]>{
        return this.http.get<Chempion[]>(`${this.baseUrl}`);
    }

    getById(id: number): Observable<Chempion>{
        if (id == undefined) return of()

        return this.http.get<Chempion>(`${this.baseUrl}/${id}`);
    }

    delete(id: number): Observable<Chempion>{
        let params = new HttpParams().set('id', id.toString());
        return this.http.delete<Chempion>(`${this.baseUrl}/${id}`, {params: params});
    }

}