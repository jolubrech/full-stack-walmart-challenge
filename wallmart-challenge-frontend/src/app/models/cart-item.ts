export class CartItem {
  id: number;
  brand: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  remainingDiscountMoney: number;
  discount: number;
  /**
    * Constructor.
    */
  constructor(id: number, brand: string, description: string, image: string, price: number, quantity: number, remainingDiscountMoney: number, discount: number) {
    this.id = id;
    this.brand = brand;
    this.description = description;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
    this.remainingDiscountMoney = remainingDiscountMoney;
    this.discount = discount;
  }
}

