import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
/* import { Product } from '../models/interfaces' */
import { Product } from '../models/product'

import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  brands: string[] = []
  constructor(private http: HttpClient) { }


  getProducts(): Observable<Product[]> {
    console.debug("Consultando Servicio Productos")
    return this.http.get<Product[]>(`${environment.API_DOMAINS.PRODUCTS}`);
  }

  getProductsByBrand(selectedFilters: string[]): Observable<Product[]> {
    console.debug("Consultando Servicio Productos Por Marca")
    return this.http.get<Product[]>(`${environment.API_DOMAINS.PRODUCTS_BY_BRAND}?brands=${selectedFilters}`);
  }

  getBrands(): Observable<string[]> {
    console.debug("Consultando Servicio Productos")
    return this.http.get<Product[]>(`${environment.API_DOMAINS.PRODUCTS}`).pipe(
      map((res: Product[]) => {


        res.forEach(element => {
          this.brands.push(element.brand);
        });

        let uniqueBrands: string[] = [];
        this.brands.forEach((brand) => {
          if (!uniqueBrands.includes(brand)) {
            uniqueBrands.push(brand);
          }
        });

        return uniqueBrands;
      })
    );;
  }
}
