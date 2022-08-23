import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModuleCreate } from '../admin/admin.model';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../student/student.service';

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
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      id: ['', [Validators.required]],
      count: ['', [Validators.required]],
    });
    this.loadModules();
  }

  loadModules() {
    this.service.loadModules().subscribe((data: ModuleCreate[]) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Id', form.value.id);
    console.log('Count', form.value.count);
    this.service
      .createModule(form.value.id, form.value.count)
      .subscribe((data: any) => {
        console.log(data);
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
      console.log(data);
    });
  }
}
