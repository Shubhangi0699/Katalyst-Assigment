import { Component,HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for Angular directives like *ngIf, *ngFor
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ProductCategoryCarouselComponent } from '../product-category-carousel/product-category-carousel.component';
import { Router } from '@angular/router';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { CartdetailsService } from '../cartdetails.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,  
    HeaderComponent,  
    FooterComponent,
    ProductCategoryCarouselComponent,CartSidebarComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router,private renderer: Renderer2,private cartService: CartdetailsService,) {}
  showCarousel = false;
  isCartOpen: boolean = false;
  
  navigateToShop() {
    this.router.navigate(['/shop']);
  }
  toggleCart() {
    this.cartService.toggleCart();
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
   
    const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    console.log('Scroll Y Position:', scrollY);
    if (scrollY > 300) {
      this.showCarousel = true; 
    } else {
      this.showCarousel = false; 
    }
  }
}


  
