import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemsAdded: Product[] = []
  constructor() { }

  addItem(produt: Product) {


  }
}
