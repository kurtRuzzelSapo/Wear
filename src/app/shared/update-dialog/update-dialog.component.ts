import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-update-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css'],
})
export class UpdateDialogComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService, // Inject your service
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private snackBar: MatSnackBar
  
  ) {}

  ngOnInit(): void {
    // Initialize the form with the product data
    this.productForm = this.fb.group({
      title: [this.data.product.title, Validators.required],
      price: [this.data.product.price, [Validators.required, Validators.min(0)]],
      category: [this.data.product.category, Validators.required],
      description: [this.data.product.description, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct = { ...this.data.product, ...this.productForm.value };
      this.productService.updateProduct(updatedProduct).subscribe({
        next: (product) => {
          this.snackBar.open('Product updated successfully!', 'Close', {
            duration: 2000, // Duration the snackbar will be shown in milliseconds
            verticalPosition: 'top', // Position at the top of the page
            horizontalPosition: 'center' // Centered horizontally
          });
          this.dialogRef.close(product); // Close dialog and return the updated product
         
        },
        error: (err) => {
          console.error('Update failed', err);
        },
      });
    }
  }
}
