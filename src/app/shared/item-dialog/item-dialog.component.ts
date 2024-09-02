import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../model/product';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-item-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css'],
})
export class ItemDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private dialog: MatDialog // Inject MatDialog service here
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  get product(): Product {
    return this.data.product;
  }

  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '70%',
      maxWidth: '1200px',
      maxHeight: '90%',
      height: '100vh',
      data: { product: this.product } // Pass the product data to the update dialog
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The update dialog was closed', result);
        // Update your product data here if needed
        this.data.product = result;
      }
    });
  }
}
