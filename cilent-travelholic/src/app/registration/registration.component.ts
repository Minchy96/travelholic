import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserDto } from '../model/user-dto';
import { UserService } from '../services/user-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    userDto: UserDto
    dateBirth: String;
    tryUsername: any

    constructor(private userService: UserService,
        private router: Router) { }

    ngOnInit() {
    }

    registrationForm = new FormGroup({
        email: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        birthDate: new FormControl(),
        address: new FormControl(),
        username: new FormControl(),
        password: new FormControl(),
        caption: new FormControl(),
    })

    saveUser() {
        this.userDto = new UserDto();
        this.userDto.firstName = this.registrationForm.get("firstName").value;
        this.userDto.lastName = this.registrationForm.get("lastName").value;
        this.userDto.password = this.registrationForm.get("password").value;
        this.userDto.address = this.registrationForm.get("address").value;
        this.userDto.caption = this.registrationForm.get("caption").value;
        this.userDto.email = this.registrationForm.get("email").value;
        this.userDto.username = this.registrationForm.get("username").value;

        let dateBirth = this.registrationForm.get("birthDate").value.year + "-" + this.registrationForm.get("birthDate").value.month + "-" + this.registrationForm.get("birthDate").value.day;
        this.userDto.birthDate = dateBirth;

        let username = this.registrationForm.get('username').value
        this.userService.tryUsername(username).subscribe(data => {
            console.log(data)
        })

       
        console.log(this.userDto)


        this.userService.saveUser(this.userDto).subscribe(data => {
            console.log(data);
            sessionStorage.setItem('username', this.registrationForm.get("username").value)
            this.router.navigate(["home"]);
        }, (err: HttpErrorResponse) => {
        });
    }

  /*  sreditiOvo() {
        let usernameTemp = this.registrationForm.get('username').value
        this.userService.tryUsername(usernameTemp).subscribe(data => {
            this.tryUsername = data
            if (this.tryUsername == "true"){
                this.userDto.username = this.registrationForm.get("username").value;
            }
            
        })
    } */



}
