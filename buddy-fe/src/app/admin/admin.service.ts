import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin, ModuleCreate } from './admin.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:8080/api/admin';
  headers = { 'content-type': 'application/json' };
  isLoggedIn = false;

  public login(id: string, pwd: string) {
    let admin: Admin = { id: id, password: pwd };

    return this.http
      .post(this.url + '/check', admin, {
        headers: this.headers,
      })
      .pipe(
        map((data: any) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(data));
          // this.currentUserSubject.next(data);

          if (data && data.resp) {
            this.isLoggedIn = data.resp;
          } else {
            this.isLoggedIn = false;
          }
          return data;
        })
      );

    // ((data: any) => {
    //   if (data && data.resp) {
    //     this.isLoggedIn = data.resp;
    //   } else {
    //     this.isLoggedIn = false;
    //   }
    // });
  }

  isAuthenticated(): boolean {
    console.log(this.isLoggedIn);
    return this.isLoggedIn;
  }

  public createModule(id: string, count: number) {
    let m: ModuleCreate = { id: id, count: count };
    return this.http.post(this.url + '/create', m, {
      headers: this.headers,
    });
  }

  public loadModules(): Observable<any> {
    return this.http.get(this.url + '/modules');
    // .pipe(map((d) => new ModuleCreate(d)));
  }

  public match(id: string): Observable<any> {
    return this.http.get(this.url + '/match/' + id);
  }
}
