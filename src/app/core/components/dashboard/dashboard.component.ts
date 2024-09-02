import { Component, inject, OnInit } from '@angular/core';
import { LandingTopnavComponent } from '../../../shared/landing-topnav/landing-topnav.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../../../model/product';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { UpdateDialogComponent } from '../../../shared/update-dialog/update-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { CreateDialogComponent } from '../../../shared/create-dialog/create-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LandingTopnavComponent, RouterLink, RouterLinkActive, CommonModule, MatIconModule, MatMenuModule, MatButtonModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  ps = inject(ProductService);
  products: Product[] = [];

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.ps.getAllProduct().subscribe(
      (data: Product[]) => {
        this.products = data;
        console.log(data)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '70%',
      maxWidth: '1200px',
      maxHeight: '90%',
      height: '100vh',
      
    });
  
    dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        console.log('The dialog was closed with result:', result);
        this.products.push(result); // Add the new product to the list
        // Alternatively, you can reload the product list by uncommenting the next line:
        // this.loadProducts();
      }
    });
  }
  openUpdateDialog(product: Product): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '70%',
      maxWidth: '1200px',
      maxHeight: '90%',
      height: '100vh',
      data: { product } // Pass the product data to the update dialog
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
   
    });
  }










  openDeleteDialog(product: Product): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      // width: '70%',
      // maxWidth: '1200px',
      // maxHeight: '90%',
      // height: '100vh',
      data: { product } // Pass the product data to the update dialog
    });
  


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Product deleted successfully');
        // Remove the product from the local list or refresh the list
        this.removeProductFromList(product.id);
      } else {
        console.log('Delete action canceled or failed');
      }
    });
  }

  private removeProductFromList(productId: number): void {
    // Logic to remove the product from the local list in the UI
    // Example:
    this.products = this.products.filter(p => p.id !== productId);
  }


  }

