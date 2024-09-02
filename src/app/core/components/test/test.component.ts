import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../model/product';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  products: Product[] = [];
  ps = inject(ProductService)

  // constructor(private ps: ProductService){}


  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct(){
    this.ps.getAllProduct().subscribe(
      (response) =>{
        this.products = response
        console.log(response)
      },
      (error) => {
        console.error(error)
      }
    );
  }

  // getAllCategories() {
  //   this.productService.getAllProductCategory().subscribe(
  //     (response) => {
  //       this.categories = response.data.categories;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
}
