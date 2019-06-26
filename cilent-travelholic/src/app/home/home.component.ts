import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post-service';
import { UserService } from '../services/user-service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommentDto } from '../model/comment-dto';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    posts: any
    username : String
    commentDto : CommentDto

    commentForm = new FormGroup({
        text: new FormControl(),
    })

    constructor(private postService: PostService) {
        this.getAllPosts();
        this.username = sessionStorage.getItem('username');
    }

    ngOnInit() {
    }

    getAllPosts(){
        this.postService.getPosts().subscribe(data => {
            this.posts = data
            console.log(this.posts)
        });
    }

    addComment(postId : number){
        this.commentDto = new CommentDto()
        this.commentDto.username = this.username
        this.commentDto.postId = postId
        this.commentDto.text = this.commentForm.get("text").value;

        console.log(this.commentDto)
        this.postService.saveComment(this.commentDto).subscribe( data => {
            console.log(data)
            this.commentForm.get("text").setValue("");
            this.getAllPosts();
        })
        
    }

    removeComm(commId : number){
        this.postService.deleteComment(commId).subscribe(data => {
            console.log(data)
            this.getAllPosts()
        })
    }



}
