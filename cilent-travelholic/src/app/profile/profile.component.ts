import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user : any
    newPost : boolean


    constructor(private userService: UserService) {
        this.userService.getUserByUsername().subscribe( data => {
            this.user = data
            console.log(this.user)
        }) 
        this.newPost = false;
    }

    ngOnInit() {
       
    }

    addPost(){
        this.newPost = true;

    }

}
