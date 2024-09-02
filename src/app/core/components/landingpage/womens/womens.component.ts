import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LandingTopnavComponent } from '../../../../shared/landing-topnav/landing-topnav.component';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../model/product';
import { ItemDialogComponent } from '../../../../shared/item-dialog/item-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-womens',
  standalone: true,
  imports: [RouterLink, LandingTopnavComponent, MatDialogModule, CommonModule, MatMenuModule, MatButtonModule],
  templateUrl: './womens.component.html',
  styleUrl: './womens.component.css'
})
export class WomensComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  ps = inject(ProductService)
  constructor(public dialog: MatDialog) {}



  ngOnInit(): void {
    this.loadProducts()
  }


  loadProducts(): void {
    this.ps.getWomensProduct().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.filteredProducts = data; // Initially, show all products
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //  getWomensProduct(){
  //   this.ps.getWomensProduct().subscribe(
  //     (response) =>{
  //       this.products = response
  //       console.log(response)
  //     },
  //     (error) => {
  //       console.error(error)
  //     }
  //   );
  // }
  
  sortProductsByPrice(ascending: boolean = true): void {
    this.filteredProducts = this.ps.sortProductsByPrice(this.filteredProducts, ascending);
  }

  sortProductsByRating(ascending: boolean = true): void {
    this.filteredProducts = this.ps.sortProductsByRating(this.filteredProducts, ascending);
  }

  onSearch(query: string): void {
    this.filteredProducts = this.ps.searchProducts(this.products, query);
  }


  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '70%',
      maxWidth: '1200px', // Sets a maximum width to ensure it doesn't exceed a certain size
      maxHeight:'90%',
      height: '100vh',
      data: {product}
     
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // if (result !== undefined) {
      //   this.animal = result; // Update the animal variable
      // }
    });
  }
}
