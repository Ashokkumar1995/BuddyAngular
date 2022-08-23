import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student.model';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:8080/api/student';
  headers = { 'content-type': 'application/json' };

  public submit(
    email: string,
    moduleCode: string,
    groupId: string
  ): Observable<any> {
    let student: Student = {
      id: email,
      moduleId: moduleCode,
      groupId: groupId,
    };
    return this.http.post(this.url + '/create', student, {
      headers: this.headers,
    });
  }

  public getAllStudents(id: string): Observable<any> {
    return this.http.get(this.url + '/all/' + id);
  }
}
