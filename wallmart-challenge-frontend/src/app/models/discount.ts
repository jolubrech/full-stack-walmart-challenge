export class Discount {
  brand: string;
  threshold: number;
  discount: number;
  /**
    * Constructor.
    */
  constructor(brand: string, threshold: number, discount: number) {
    this.brand = brand;
    this.threshold = threshold;
    this.discount = discount;
  }
}


export class DiscountMessage {
  id: number;
  brand: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  remainingDiscountMoney: number;
  discount: number;
  threshold: number
  /**
    * Constructor.
    */
  constructor(id: number, brand: string, description: string, image: string, price: number, quantity: number, remainingDiscountMoney: number, discount: number, threshold: number) {
    this.id = id;
    this.brand = brand;
    this.description = description;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
    this.remainingDiscountMoney = remainingDiscountMoney;
    this.discount = discount;
    this.threshold = threshold;
  }
}
