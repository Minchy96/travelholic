import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    user : any

  constructor(private userService : UserService) {
    this.userService.getUserByUsername().subscribe(data => {
        this.user = data
        console.log(this.user)
    })
   }

  ngOnInit() {
  }

}
