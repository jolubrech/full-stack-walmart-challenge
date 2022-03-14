import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, Subject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  subject = new Subject<Product>();

  constructor() { }


  sendNotification(product: Product) {
    this.subject.next(product);
  }

  getNotification(): Observable<Product> {
    return this.subject.asObservable();
  }

}
