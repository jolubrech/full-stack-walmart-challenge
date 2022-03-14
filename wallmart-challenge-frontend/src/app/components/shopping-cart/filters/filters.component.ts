import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Output() selectedFilters: EventEmitter<any> = new EventEmitter();
  productBrands: string[] = []
  productBrandsSelected: string[] = []
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {

    this.productService.getBrands().subscribe({
      next: (brands) => { this.productBrands = brands },
      error: (error) => {
        console.error(error)
      },
      complete: () => { }
    })
  }

  applyFilter(): void {
    this.selectedFilters.emit(this.productBrandsSelected);
  }

  filterChanged() {
    let filterCheckboxes = document.querySelectorAll('.custom-control-input');
    this.productBrandsSelected = [];
    filterCheckboxes.forEach((element: any) => {
      if (element.checked) {
        this.productBrandsSelected.push(element.value)
      }
    });
    console.log(this.productBrandsSelected)
  }

  clearBrandFilter(): void {

    let filterCheckboxes = document.querySelectorAll('.custom-control-input');
    this.productBrandsSelected = [];
    filterCheckboxes.forEach((element: any) => {
      if (element.checked) {
        element.checked = !element.checked
      }
    });

  }
}
