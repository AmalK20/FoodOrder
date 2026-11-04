import { CartItem } from "./cartItem";

export class Cart{
    items: CartItem[] = [];

    totalCount:number = 0;

    get totalPrice(): number{
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.price;
    })
    return totalPrice;
}
}