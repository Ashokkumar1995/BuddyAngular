import { HttpClient, HttpHeaders } from '@angular/common/http';
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
            sessionStorage.setItem('logIn', 'true');
          } else {
            this.isLoggedIn = false;
            sessionStorage.setItem('logIn', 'false');
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

  logOff() {
    this.isLoggedIn = false;
    sessionStorage.setItem('logIn', 'false');
  }

  isAuthenticated(): boolean {
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

  public deleteModule(id: string): Observable<any> {
    let m: ModuleCreate = { id: id, count: 0 };
    const httpOptions = {
      headers: this.headers,
      body: m,
    };

    return this.http.delete(this.url + '/delete', httpOptions);
  }
}
