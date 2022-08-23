import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      id: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Email', form.value.id);
    console.log('pwd', form.value.pwd);

    // this.service.login(form.value.id, form.value.pwd).subscribe((data) => {
    //   console.log(data);
    // });
    this.service.login(form.value.id, form.value.pwd).subscribe((data) => {
      // console.log(data);
      if (data.resp == 'true') {
        this.router.navigate(['/create']);
      } else {
        this._snackBar.open('Incorrect Password', 'Ok');
        this.myForm.reset();
      }
    });
  }
}
