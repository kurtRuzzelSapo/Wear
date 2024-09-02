import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { LandingTopnavComponent } from '../../../shared/landing-topnav/landing-topnav.component';
import { ItemDialogComponent } from '../../../shared/item-dialog/item-dialog.component';
import { Product } from '../../../model/product';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [
    RouterLink, 
    LandingTopnavComponent, 
    MatDialogModule, 
    CommonModule, 
    MatMenuModule, 
    MatButtonModule
  ],
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
})
export class LandingpageComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  ps = inject(ProductService);

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.ps.getAllProduct().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.filteredProducts = data; // Initially, show all products
      },
      (error) => {
        console.error(error);
      }
    );
  }

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
      maxWidth: '1200px',
      maxHeight: '90%',
      height: '100vh',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
