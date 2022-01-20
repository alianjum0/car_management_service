export interface BaseCar {
  make: string;
  color: string;
  year: number;
  price: number;
  userId: number;
}

export interface Car extends BaseCar {
  id: number;
}
