import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Product } from "src/app/models/product";
/* import { Product } from "src/app/models/interfaces"; */
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.css']
})
export class ProductsListingComponent implements OnInit, OnChanges {

  @Input() selectedFilters: string[] = []
  productList: Product[] = []

  constructor(private productService: ProductsService) { }


  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.productList = response;
      },
      error: (err) => console.error(err),
      complete: () => console.info('complete')
    });
  }

  ngOnChanges(): void {

    console.log("ngOnChanges", this.selectedFilters)

    //Filtrar por filtro de marcas
    if (this.selectedFilters.length > 0) {
      this.productService.getProductsByBrand(this.selectedFilters).subscribe({
        next: (response) => {
          this.productList = response;
        },
        error: (err) => console.error(err),
        complete: () => console.info('complete')
      });
    } else { //Si no hay ninguna marca seleccionada al momento de aplicar filtro
      this.productService.getProducts().subscribe({
        next: (response) => {
          this.productList = response;
        },
        error: (err) => console.error(err),
        complete: () => console.info('complete')
      });
    }
  }

}
