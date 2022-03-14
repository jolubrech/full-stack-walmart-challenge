import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Discount } from '../models/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor(private http: HttpClient) { }

  geDiscounts(): Observable<Discount[]> {
    console.debug("Consultando Servicio Discounts")
    return this.http.get<Discount[]>(`${environment.API_DOMAINS.DISCOUNTS}`);
  }

}
