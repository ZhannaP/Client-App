import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Item } from "src/app/core/models/item";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ItemService{

    private defaultHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    private httpOptions = {
        headers: this.defaultHeaders
    }
    private baseUrl = `${environment.apiRootUrl}items`;

    constructor(private http: HttpClient){}

    create(model: Item): Observable<Item>{
        return this.http.post<Item>(`${this.baseUrl}`, model, {observe: 'response', headers: this.defaultHeaders})
            .pipe(
                map(response => {
                    return response.body as Item
                })
            )
    }

    update(model: Item): Observable<Item>{
        return this.http.put<Item>(`${this.baseUrl}`, model, {observe: 'response', headers: this.defaultHeaders})
            .pipe(
                map(response => {
                    return response.body as Item
                })
            )
    }

    getAll(): Observable<Item[]>{
        return this.http.get<Item[]>(`${this.baseUrl}`);
    }

    getById(id: number): Observable<Item>{
        if (id == undefined) return of()

        return this.http.get<Item>(`${this.baseUrl}/${id}`);
    }

    delete(id: number): Observable<Item>{
        let params = new HttpParams().set('id', id.toString());
        return this.http.delete<Item>(`${this.baseUrl}/${id}`, {params: params});
    }

}