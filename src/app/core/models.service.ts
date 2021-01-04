import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Configuration} from "../../configuration";
import {Observable} from "rxjs";
import {Models} from "./models.type";

@Injectable({
	providedIn: 'root'
})
export class ModelsService {
	private readonly apiUrl: string;

	constructor(private readonly httpClient: HttpClient) {
		this.apiUrl = Configuration.server;
	}

	getRandomModels(num: number): Observable<Models[]> {
		return this.httpClient.get<Models[]>(`${this.apiUrl}/api/models/random/${encodeURIComponent(String(num))}`);
	}
}
