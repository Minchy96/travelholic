import { Injectable } from '@angular/core';
import { UserDto } from '../model/user-dto';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { LoginDto } from '../model/login-dto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    username : String

    constructor(private http: HttpClient) {
     }

    saveUser(userDto : UserDto){
        let url = environment.backendUrl+"user/save";
        return this.http.post<any>(url, userDto);
      
    }

    loginUser(loginDto : LoginDto){
        let url = environment.backendUrl+"user/login";
        return new Observable((o: any) => {
            this.http.post(url, loginDto).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    getUserByUsername(){
        let url = environment.backendUrl+"user/get/"+this.username;
        return new Observable((o: any) => {
            this.http.get(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
      
    }

    editUser(userDto : UserDto){
        let url = environment.backendUrl+"user/update";
        return new Observable((o: any) => {
            this.http.post(url, userDto).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

}
