import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem!: Product

  constructor(private notifier: NotifierService) { }

  ngOnInit(): void {
  }

  handleAddCart() {
    this.notifier.sendNotification(this.productItem);
  }

}
