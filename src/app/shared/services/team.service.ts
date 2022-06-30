import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Team } from "src/app/core/models/team";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class TeamService{

    private defaultHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    private httpOptions = {
        headers: this.defaultHeaders
    }
    private baseUrl = `${environment.apiRootUrl}teams`;

    constructor(private http: HttpClient){}

    create(model: Team): Observable<Team>{
        return this.http.post<Team>(`${this.baseUrl}`, model, {observe: 'response', headers: this.defaultHeaders})
            .pipe(
                map(response => {
                    return response.body as Team
                })
            )
    }

    update(model: Team): Observable<Team>{
        return this.http.put<Team>(`${this.baseUrl}`, model, {observe: 'response', headers: this.defaultHeaders})
            .pipe(
                map(response => {
                    return response.body as Team
                })
            )
    }

    getAll(): Observable<Team[]>{
        return this.http.get<Team[]>(`${this.baseUrl}`);
    }

    getById(id: number): Observable<Team>{
        if (id == undefined) return of()

        return this.http.get<Team>(`${this.baseUrl}/${id}`);
    }

    delete(id: number): Observable<Team>{
        let params = new HttpParams().set('id', id.toString());
        return this.http.delete<Team>(`${this.baseUrl}/${id}`, {params: params});
    }

}