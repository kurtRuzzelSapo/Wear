import { Component, Inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../model/product';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>, // Update to DeleteDialogComponent
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.productService.deleteProduct(this.data.product.id).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.snackBar.open('Product deleted successfully!', 'Close', {
          duration: 2000, // Duration the snackbar will be shown in milliseconds
          verticalPosition: 'top', // Position at the top of the page
          horizontalPosition: 'center' // Centered horizontally
        });
        this.dialogRef.close(true); // Close the dialog and return success
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.dialogRef.close(false); // Close the dialog and return failure
      },
    });
  }
}
