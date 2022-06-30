import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Tournament } from "src/app/core/models/tournament";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class TournamentService{

    private defaultHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    private httpOptions = {
        headers: this.defaultHeaders
    }
    private baseUrl = `${environment.apiRootUrl}tournaments`;

    constructor(private http: HttpClient){}

    create(model: Tournament): Observable<Tournament>{
        return this.http.post<Tournament>(`${this.baseUrl}`, model, {observe: 'response', headers: this.defaultHeaders})
            .pipe(
                map(response => {
                    return response.body as Tournament
                })
            )
    }

    update(model: Tournament): Observable<Tournament>{
        return this.http.put<Tournament>(`${this.baseUrl}`, model, {observe: 'response', headers: this.defaultHeaders})
            .pipe(
                map(response => {
                    return response.body as Tournament
                })
            )
    }

    getAll(): Observable<Tournament[]>{
        return this.http.get<Tournament[]>(`${this.baseUrl}`);
    }

    getById(id: number): Observable<Tournament>{
        if (id == undefined) return of()

        return this.http.get<Tournament>(`${this.baseUrl}/${id}`);
    }

    delete(id: number): Observable<Tournament>{
        let params = new HttpParams().set('id', id.toString());
        return this.http.delete<Tournament>(`${this.baseUrl}/${id}`, {params: params});
    }
}