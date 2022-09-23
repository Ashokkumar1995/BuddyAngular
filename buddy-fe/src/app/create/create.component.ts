import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModuleCreate } from '../admin/admin.model';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../student/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  createForm!: FormGroup;
  dataSource = new MatTableDataSource<ModuleCreate>(undefined);
  students: any = [];

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private studentService: StudentService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('logIn') == 'true') {
      console.log('Login Success');
    } else {
      this.router.navigate(['/admin']);
    }

    this.createForm = this.fb.group({
      id: ['', [Validators.required]],
      count: ['', [Validators.required]],
    });
    this.loadModules();
  }

  loadModules() {
    this.service.loadModules().subscribe((data: ModuleCreate[]) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  onSubmit(form: FormGroup) {
    this.service
      .createModule(form.value.id, form.value.count)
      .subscribe((data: any) => {
        if (data.body.resp) {
          this.openSnackBar('Created Successfully !');
          this.createForm.reset();
          this.loadModules();
        }
      });
  }

  openSnackBar(message: string, action: string = 'Ok') {
    this._snackBar.open(message, action);
  }

  preview(id: string) {
    this.studentService.getAllStudents(id).subscribe((data) => {
      this.students = data;
    });
  }

  match(id: string) {
    this.service.match(id).subscribe((data) => {
      this.openSnackBar(
        'Match Done Successfully, click the view button to see the changes'
      );
    });
  }

  deleteModule(id: string) {
    this.service.deleteModule(id).subscribe((data) => {
      this.openSnackBar('Successfully deleted');
      this.loadModules();
    });
  }

  logOut() {
    this.service.logOff();
    this.router.navigate(['/admin']);
  }
}
