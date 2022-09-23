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
    if (sessionStorage.getItem('logIn') == 'true') {
      this.router.navigate(['/create']);
    }
    this.myForm = this.fb.group({
      id: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
    });
  }

  onSubmit(form: FormGroup) {
    this.service.login(form.value.id, form.value.pwd).subscribe((data) => {
      if (data.resp == 'true') {
        this.router.navigate(['/create']);
      } else {
        this._snackBar.open('Incorrect Password', 'Ok');
        this.myForm.reset();
      }
    });
  }
}
