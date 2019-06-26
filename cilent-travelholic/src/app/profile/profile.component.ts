import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { FormGroup, FormControl } from '@angular/forms';
import { PostDto } from '../model/post-dto';
import { PostService } from '../services/post-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    username: string
    otherUsername: string
    seePosts: boolean
    about: boolean
    editProfile: boolean
    postDto: PostDto = new PostDto()
    user: any

    newPostForm = new FormGroup({
        title: new FormControl(),
        description: new FormControl(),
        amount: new FormControl(),
        start: new FormControl(),
        end: new FormControl(),
        city: new FormControl(),
        zipcode: new FormControl(),
        country: new FormControl(),
    })


    constructor(private userService: UserService, private postService: PostService, private router: Router,
        private route: ActivatedRoute) {
        this.username = sessionStorage.getItem('username')

        if (this.router.url != "/profile")
            this.otherUsername = this.route.snapshot.paramMap.get('username');
        else
            this.otherUsername = this.username

        this.userService.getUserByUsername(this.otherUsername).subscribe(data => {
            this.user = data
            console.log(this.user)
        })
        console.log(this.router.url)

        this.about = true;
        this.seePosts = false;
        this.editProfile = false;

    }

    ngOnInit() {

    }

    seeAbout() {
        this.userService.getUserByUsername(this.username).subscribe(data => {
            this.user = data
            console.log(this.user)
        })
        this.about = true;
        this.seePosts = false;
        this.editProfile = false;
    }

    posts() {
        this.about = false;
        this.seePosts = true;
        this.editProfile = false;
    }

    seeEditProfile() {
        this.about = false;
        this.seePosts = false;
        this.editProfile = true;
    }

    addPost() {
        this.postDto.username = this.username
        let startDate = this.newPostForm.get("start").value.year + "-" + this.newPostForm.get("start").value.month + "-" + this.newPostForm.get("start").value.day;
        this.postDto.start = startDate;

        let endDate = this.newPostForm.get("end").value.year + "-" + this.newPostForm.get("end").value.month + "-" + this.newPostForm.get("end").value.day;
        this.postDto.end = endDate;
        this.postDto.city = this.newPostForm.get("city").value;
        this.postDto.zipcode = this.newPostForm.get("zipcode").value;
        this.postDto.country = this.newPostForm.get("country").value;
        this.postDto.title = this.newPostForm.get("title").value;
        this.postDto.description = this.newPostForm.get("description").value;
        this.postDto.amount = this.newPostForm.get("amount").value;

        console.log(this.postDto)
        this.postService.savePost(this.postDto).subscribe(data => {
            console.log(data)
        });
        this.newPostForm.reset();
        /*   this.newPostForm.get("title").setValue("");
           this.newPostForm.get("description").setValue("");
           this.newPostForm.get("start").setValue("");
           this.newPostForm.get("end").setValue("");
           this.newPostForm.get("city").setValue("");
           this.newPostForm.get("zipcode").setValue("");
           this.newPostForm.get("contry").setValue(""); */
    }

}
