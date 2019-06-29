import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post-service';
import { UserService } from '../services/user-service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommentDto } from '../model/comment-dto';
import { identifierModuleUrl } from '@angular/compiler';
import { SearchDto } from '../model/search-dto';
import { SearchService } from '../services/search.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    posts: any
    username: String
    commentDto: CommentDto
    searchDto: SearchDto
    cities: any
    countries: any

    commentForm = new FormGroup({
        text: new FormControl(),
    })

    searchForm = new FormGroup({
        city: new FormControl(),
        country: new FormControl(),
        start: new FormControl(),
        end: new FormControl(),
    })

    constructor(private postService: PostService, private searchService: SearchService) {
        this.getAllPosts();
        this.username = sessionStorage.getItem('username');
        this.searchDto = new SearchDto()

        searchService.getCities().subscribe(data => {
            this.cities = data
            console.log(data)
        })

        searchService.getCountries().subscribe(data => {
            this.countries = data
            console.log(data)
        })
    }

    ngOnInit() {
    }

    getAllPosts() {
        this.postService.getPosts().subscribe(data => {
            this.posts = data
            console.log(this.posts)
            this.searchForm.reset()
            this.searchService.getCities().subscribe(data => {
                this.cities = data
                console.log(data)
            })
        });
    }

    addComment(postId: number) {
        this.commentDto = new CommentDto()
        this.commentDto.username = this.username
        this.commentDto.postId = postId
        this.commentDto.text = this.commentForm.get("text").value;

        console.log(this.commentDto)
        this.postService.saveComment(this.commentDto).subscribe(data => {
            console.log(data)
            this.commentForm.get("text").setValue("");
            this.getAllPosts();
        })

    }

    removeComm(commId: number) {
        this.postService.deleteComment(commId).subscribe(data => {
            console.log(data)
            this.getAllPosts()
        })
    }

    search() {
        if (this.searchForm.get("start").value != null) {
            let start = this.searchForm.get("start").value.year + "-" + this.searchForm.get("start").value.month + "-" + this.searchForm.get("start").value.day;
            this.searchDto.start = start;
        } else {
            this.searchDto.start = null;
        }

        if (this.searchForm.get("end").value != null) {
            let end = this.searchForm.get("end").value.year + "-" + this.searchForm.get("end").value.month + "-" + this.searchForm.get("end").value.day;
            this.searchDto.end = end;
        } else {
            this.searchDto.end = null;
        }

        console.log(this.searchDto, "promenjen datum")
        this.postService.getPostsWithFilters(this.searchDto).subscribe(data => {
            this.posts = data
            console.log(data)
          //  this.searchForm.reset()
        })
    }

    cityByCountry() {
        let name = this.searchForm.get("country").value

        this.searchService.getCitiesByCountry(name).subscribe(data => {
            this.cities = data
        })
    }
    favoutire(postId){
        this.postService.addFavourite(this.username,postId).subscribe( data => {
            console.log(data)
        })
    }





}
