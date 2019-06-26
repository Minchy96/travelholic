import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user-service';
import { LoginDto } from '../model/login-dto';
import { Router } from '@angular/router';
import { equal } from 'assert';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginDto: LoginDto

    loginForm = new FormGroup({
        username: new FormControl(),
        password: new FormControl(),
    })

    constructor(private userServce: UserService,
        private router: Router) { }

    ngOnInit() {
    }

    login() {
        this.loginDto = new LoginDto();
        this.loginDto.username = this.loginForm.get("username").value;
        this.loginDto.password = this.loginForm.get("password").value;
        console.log(this.loginDto)
        this.userServce.loginUser(this.loginDto).subscribe(data => {
            if (data == "0") {
               // this.userServce.username = this.loginDto.username;
               sessionStorage.setItem('username', this.loginForm.get("username").value)
                this.router.navigate(["home"]);
             } else
                location.reload();
        });

        
    }

}
