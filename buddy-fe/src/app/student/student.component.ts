import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Student } from './student.model';
import { StudentService } from './student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BannerDialogComponent } from './banner-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  myForm!: FormGroup;
  result: string | undefined;
  // success = false;
  // responseMessage = '';
  constructor(
    private fb: FormBuilder,
    private service: StudentService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      moduleCode: ['', [Validators.required]],
    });
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BannerDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  onSubmit(form: FormGroup) {
    this.result = undefined;
    console.log('Valid?', form.valid); // true or false
    console.log('Email', form.value.email);
    console.log('Message', form.value.moduleCode);
    this.service
      .submit(form.value.email, form.value.moduleCode, '0')
      .subscribe((data) => {
        // if (!data.body.resp && data.statusCode == 'OK') {
        //   this.success = true;
        //   this.responseMessage =
        //     'Successfully submitted !! you will receive a mail once the partner is matched.';
        // }
        // else if (data.body.resp == 'No Group') {
        //   this.success = true;
        //   this.responseMessage =
        //     'You have already submitted your details and not assigned a partner yet';
        // }

        if (data.body) {
          if (data.body.resp == 'No Group') {
            this.openSnackBar(
              'You have already submitted your details and not assigned a partner yet'
            );
          } else if (data.statusCode == 'OK' && data.body.id) {
            this.openSnackBar(
              'Successfully submitted !! you will receive a mail once the partner is matched.'
            );
          } else if (data.body.length > 1) {
            let res: Student[] = data.body;
            console.log(res);
            let str = res
              .filter((f) => f.id !== form.value.email)
              .map((m) => m.id)
              .concat(',')
              .toString();
            this.result = str;
            // this.openSnackBar('Your team mates are ' + str);
          }
        } else {
          this.openSnackBar('The provided module code is incorrect.');
        }
      });
  }
  openSnackBar(message: string, action: string = 'Ok') {
    this._snackBar.open(message, action);
  }
}
