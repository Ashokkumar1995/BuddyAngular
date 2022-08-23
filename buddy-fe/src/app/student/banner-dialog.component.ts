import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'banner',
  templateUrl: 'banner-dialog.component.html',
})
export class BannerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BannerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
