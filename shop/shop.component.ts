import { Component, OnInit, Renderer2 } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CartdetailsService } from '../cartdetails.service';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  offerData?: number;  // Make offerData optional
  type: string;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
   CartSidebarComponent
  ],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products = [
    {
      id: 1,
      name: 'syltherine',
      image: "../../../assets/product_Images/Images.png", 
      price: 43152, 
      offerData: 20,
      type:'Living',
    },
    {
      id: 2,
      name: 'Bed',
      image: "../../../assets/product_Images/image 3.png", 
      price: 1000, 
      offerData: 10 ,
      type:'Kitichen',
    },
    {
      id: 3,
      name: 'Sofa',
      image: "../../../assets/product_Images/image 4.png", 
      price: 2000, 
      type:'Living',
    },
    {
      id: 4,
      name: 'Rocker',
      image:"../../../assets/product_Images/Images (1).png", 
      price: 200, 
      offerData: 55,
      type:'Kitichen',
    },
    {
      id: 5,
      name: 'Kitchen',
      image: "../../../assets/product_Images/Images (2).png", 
      price: 9000, 
      type:'Kitichen',
      
    },
    {
      id: 6,
      name: 'Dining',
      image: "../../../assets/product_Images/Images (2).png", 
      price: 400, 
      offerData: 80,
      type:'Kitichen',
    },
    {
      id: 7,
      name: 'Tables',
      image: "../../../assets/product_Images/Images (2).png", 
      price: 9000, 
      offerData: 30,
      type:'Kitichen',
    },
    {
      id: 8,
      name: 'Chair',
      image: "../../../assets/product_Images/Images (2).png", 
      price: 9000, 
      offerData: 0,
      type:'Living',
    },
    {
      id: 9,
      name: 'Barstool',
      image: "../../../assets/product_Images/Images (2).png", 
      price: 7000, 
      offerData: 21,
      type:'Living',
    },
    {
      id: 5,
      name: 'Bookcase',
      image: "../../../assets/product_Images/Images (2).png", 
      price: 7000, 
      offerData: 25,
      type:'Bed',
    },
    {
      id: 10,
      name: 'Dresser',
      image: "../../../assets/product_Images/Images (2).png", 
      price: 34000, 
      offerData: 70,
      type:'Dining',
    },
    {
      id: 11,
      name: 'Cabinate',
      image: "../../../assets/product_Images/Images (2).png", 
      price: 7000, 
      offerData: 15,
      type:'Living', 
    },
    {
      id: 12,
      name: 'Recliner',
      image: "../../../assets/product_Images/Images (2).png", 
      price: 6000, 
      offerData: 30,
      type:'Kitichen',
    },
    {
      id: 13,
      name: 'Armoire',
      image: "../../../assets/product_Images/Images (2).png", 
      price: 3000, 
      offerData: 20,
      type:'Living',
    }

  ];
  filteredProducts: Product[] = [];
  selectedType: string = 'all';
  dropdownVisible = false;
  isCartOpen: boolean = false;
  constructor(private cartService: CartdetailsService,
    private renderer: Renderer2) {}
  ngOnInit() {
    this.filteredProducts = [...this.products];
  }
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);  
    alert(`${product.name} has been added to the cart!`);
  }
  onFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedType = selectElement.value;

    if (this.selectedType === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        product => product.type === this.selectedType
      );
    }
  }
  onSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const sortBy = selectElement.value;
    if (sortBy === 'lowToHigh') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'highToLow') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else {
      this.filteredProducts = [...this.products];
    }
  }
  toggleCart() {
    this.cartService.toggleCart();
  }
}