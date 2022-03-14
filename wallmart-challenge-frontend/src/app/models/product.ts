export class Product {
  id: number;
  brand: string;
  description: string;
  image: string;
  price: number;
  /**
    * Constructor.
    */
  constructor(id: number, brand: string, description: string, image: string, price: number) {
    this.id = id;
    this.brand = brand;
    this.description = description;
    this.image = image;
    this.price = price;
  }
}

