import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  childSelectedFilters: string[] = []
  constructor() { }

  ngOnInit(): void {
  }

  searchFilteredBrands(selectedFilters: string[]) {
    this.childSelectedFilters = selectedFilters;
  }

}
