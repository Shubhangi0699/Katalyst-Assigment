import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartdetailsService {
  constructor() { }
  private cartItems = new BehaviorSubject<any[]>([]);  // BehaviorSubject to store cart items
  cartItems$ = this.cartItems.asObservable();
  private isCartOpenSubject = new BehaviorSubject<boolean>(false);
  isCartOpen$ = this.isCartOpenSubject.asObservable();

  addToCart(product: any) {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next([...currentItems, product]);  // Add new item and emit updated cart list
  }

  // Get current cart items
  getCartItems() {
    return this.cartItems.getValue();
  }
 
  toggleCart() {
    const currentState = this.isCartOpenSubject.getValue();
    this.isCartOpenSubject.next(!currentState);
  }
  removeFromCart(product: any) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.id !== product.id);
    this.cartItems.next(updatedItems);  // Emit updated cart list
  }
  openCart() {
    this.isCartOpenSubject.next(true);
  }

  closeCart() {
    this.isCartOpenSubject.next(false);
  }

}
