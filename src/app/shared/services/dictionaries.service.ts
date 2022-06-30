import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Role } from "src/app/core/models/role";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class DictionariesService{
    private defaultHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    private httpOptions = {
        headers: this.defaultHeaders
    }
    private baseUrl = `${environment.apiRootUrl}dictionaries`;

    constructor(private http: HttpClient){}

    getAll(): Observable<Role[]>{
        return this.http.get<Role[]>(`${this.baseUrl}`);
    }
}