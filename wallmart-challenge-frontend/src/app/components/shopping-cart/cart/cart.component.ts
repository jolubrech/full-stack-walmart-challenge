import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { Discount, DiscountMessage } from 'src/app/models/discount';
import { Product } from 'src/app/models/product';
import { DiscountsService } from 'src/app/services/discounts.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { faBroom } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  faBroom = faBroom;
  discountMessage!: DiscountMessage;
  availableDiscountMessage!: DiscountMessage;
  cartItems: CartItem[] = [];
  itemExists: boolean = false;
  allDiscounts: Discount[] = []
  cartTotalAmount: number = 0;

  maxItemDiscountObject!: CartItem
  isDiscountApplied: boolean = false
  isDiscountAvailable: boolean = false
  discountToApply: number = 0;


  constructor(private notifierService: NotifierService,
    private discountService: DiscountsService) { }


  ngOnInit() {
    this.discountService.geDiscounts().subscribe({
      next: (discounts) => {
        this.allDiscounts = discounts
      },
      error: (e) => { console.error("error Discounts", e) },
      complete: () => { }

    })
    this.notifierService.getNotification().subscribe({
      next: this.handleCartNotification.bind(this),
      error: (err) => console.error(err),
      complete: () => console.info('complete')
    })

  }


  cleanShoppingCart(): void {
    this.cartItems = []
    this.cartTotalAmount = 0
  }

  handleCartNotification(product: Product) {
    {
      let retreivedDiscount: Discount[];

      retreivedDiscount = this.allDiscounts.filter(discount => discount.brand == product.brand);

      //Actualiza datos carrito
      for (let i in this.cartItems) {

        if (this.cartItems[i].id === product.id) {
          this.cartItems[i].quantity++
          this.cartItems[i].remainingDiscountMoney = retreivedDiscount.length > 0 && retreivedDiscount[0].threshold - (this.cartItems[i].price * this.cartItems[i].quantity) > 0 ? (retreivedDiscount[0].threshold - (this.cartItems[i].price * this.cartItems[i].quantity)) : 0
          this.cartItems[i].discount = retreivedDiscount.length > 0 ? retreivedDiscount[0].discount : 0
          this.itemExists = true
          break;
        } else {
          this.itemExists = false
        }
      }

      //Inserta producto al carrito
      if (!this.itemExists) {
        this.cartItems.push({
          id: product.id,
          brand: product.brand,
          description: product.description,
          image: product.image,
          price: product.price,
          quantity: 1,
          remainingDiscountMoney: retreivedDiscount.length > 0 ? (retreivedDiscount[0].threshold - product.price) : product.price,
          discount: retreivedDiscount.length > 0 ? retreivedDiscount[0].discount : 0
        });
      }




      this.cartTotalAmount = 0;



      //se itera el contenido del carrito
      this.validateCartItemDiscounts();

      //Se aplica el descuento en caso de que aplique
      if (this.isDiscountApplied) {
        this.cartTotalAmount -= this.discountToApply;
      }

    }
  }

  private validateCartItemDiscounts() {

    const arr = Array.from(this.cartItems)

    const orderedByBrandObj =
      Array.from(
        arr.reduce((m, { brand, price, quantity }) => m.set(brand, (m.get(brand) || 0) + price * quantity), new Map), ([brand, total]) => ({ brand, total })
      );
    console.log(orderedByBrandObj);

    this.cartItems.forEach((item) => {

      this.cartTotalAmount += (item.quantity * item.price);

      let discountByBrand = this.allDiscounts.filter((element) => element.brand == item.brand);

      //En caso de tener descuento el producto
      if (discountByBrand.length > 0) {

        //Obtiene Item de Carrito con mayor descuento
        this.maxItemDiscountObject = this.cartItems.reduce((max, obj) => (max.discount > obj.discount) ? max : obj);

        for (const key in orderedByBrandObj) {
          if (Object.prototype.hasOwnProperty.call(orderedByBrandObj, key)) {
            const element = orderedByBrandObj[key];
            if (element.brand == item.brand) {

              //En caso de que se supere monto minimo por Marca
              if (element.total >= discountByBrand[0].threshold) {
                this.isDiscountApplied = true;
                this.discountToApply = discountByBrand[0].discount;
                this.isDiscountAvailable = false;
                this.discountMessage = {
                  ...item,
                  threshold: discountByBrand[0].threshold
                };

                if (this.maxItemDiscountObject.brand != element.brand) {
                  this.isDiscountAvailable = true;
                  this.availableDiscountMessage = {
                    ...this.maxItemDiscountObject,
                    threshold: discountByBrand[0].threshold
                  };
                }
                break;
              } else { // En caso de que NO supere monto minimo por Marca
                if (orderedByBrandObj.length > 1 && this.maxItemDiscountObject.brand != element.brand && discountByBrand[0].discount >= this.maxItemDiscountObject.discount) {
                  this.isDiscountAvailable = true;
                  this.availableDiscountMessage = {
                    ...item,
                    threshold: discountByBrand[0].threshold
                  };
                } else if (orderedByBrandObj.length == 1 && discountByBrand.length > 0) {
                  this.isDiscountAvailable = true;
                  this.availableDiscountMessage = {
                    ...item,
                    threshold: discountByBrand[0].threshold
                  };
                } else { //No existe descuento disponible
                  this.isDiscountAvailable = false;
                }
              }
            }
          }
        }
      }


    });
  }
}
