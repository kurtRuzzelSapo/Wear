import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-dialog',
  standalone:true,
  imports:[FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['default-image.jpg'], 
      rating: this.fb.group({
        rate: [0],  
        count: [0]  
      })
    });
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.addProduct(newProduct).subscribe({
        next: (product) => {
          console.log('Product added successfully', product);
          this.snackBar.open('Product added successfully!', 'Close', {
            duration: 2000, // Duration the snackbar will be shown in milliseconds
            verticalPosition: 'top', // Position at the top of the page
            horizontalPosition: 'center' // Centered horizontally
          });
          this.dialogRef.close(product); // Close the dialog and return the newly created product
        },
        error: (err) => {
          console.error('Add product failed', err);
          this.snackBar.open('Failed to add product.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        },
      });
    }
  }
  
}
