import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CartdetailsService } from '../cartdetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,  // Add HeaderComponent
    FooterComponent,  // Add FooterComponent
  ],
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss']
})
export class CartSidebarComponent {
  @Input() isOpen: boolean = false; 
  cartItems: any[] = [];
  subtotal: number = 0;
  constructor(
    private cartService: CartdetailsService,
    private router: Router) {}
  ngOnChanges() {
  console.log('isOpen:', this.isOpen);
}
toggleCart(){
  this.cartService.toggleCart();
}
ngOnInit() {
  this.cartService.isCartOpen$.subscribe(isOpen => {
    this.isOpen = isOpen;
  });
  this.cartService.cartItems$.subscribe(items => {
    this.cartItems = items;
    this.calculateSubtotal();
  });
}
calculateSubtotal() {
  this.subtotal = this.cartItems.reduce((total, item) => total + item.price, 0);
}
navigateToShop() {
  this.router.navigate(['/shop']);
  this.cartService.toggleCart();
}
removeFromCart(item:any){
  this.cartService.removeFromCart(item)
}
}

