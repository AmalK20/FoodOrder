import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = new Cart();

  addToCart(food : Food): void{
    let cartItem = this.cart.items.find(item => item.food.id === food.id)
    if(cartItem){
      this.changeQuantity(food.id, cartItem.quantity +1);
      return;
    }
    this.cart.items.push(new CartItem(food))
  }

  removeFromCart(foodID : number) :void{
    this.cart.items = this.cart.items.filter(item => item.food.id != foodID)
  }

  changeQuantity(quantity : number, foodId : number){
    const cartItem : CartItem | undefined = this.cart.items.find(item => item.food.id = foodId)
    if(!cartItem) {
      console.log("not found");
      return; 
    } 
    cartItem.quantity = quantity;
   
  }

  getCart() : Cart{
    return this.cart;
  }
  constructor() { }
}
