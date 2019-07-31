import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service';
import { PostService } from 'src/app/services/post-service';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentDto } from 'src/app/model/comment-dto';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-see-posts',
    templateUrl: './see-posts.component.html',
    styleUrls: ['./see-posts.component.scss']
})
export class SeePostsComponent implements OnInit {

    username: string
    otherUsername: string
    posts: any
    commentDto: CommentDto
    deleteSure: number
    postImages : Array<any>;


    commentForm = new FormGroup({
        text: new FormControl(),
    })

    constructor(private userService: UserService, private postService: PostService,
        private router: Router, private route: ActivatedRoute) {
        this.username = sessionStorage.getItem('username');
        if (this.router.url != "/profile")
            this.otherUsername = this.route.snapshot.paramMap.get('username');
        else
            this.otherUsername = this.username

        this.getAllPosts()
        this.deleteSure = -1;
    }

    ngOnInit() {
    }

    getAllPosts() {
        this.postService.getUsersPosts(this.otherUsername).subscribe(data => {
            this.posts = data
            this.getImages()
        });
    }

    getImages(){
        this.postImages = new Array()
        for (let i = 0; i < this.posts.length; i++) {
            let post = this.posts[i]
            if (post.imageName != null ) {
                this.postService.getImage(post.imageName).subscribe(response => {
                    this.postImages[i] = response;
                })
            } else {
                this.postImages[i] = null;
            }
        }

        console.log("slike", this.postImages)
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

    deletePost(postId: number) {
        if (this.deleteSure >= 0) {
            this.postService.deletePost(this.deleteSure).subscribe(data => {
                console.log(data)
                this.getAllPosts()
                this.deleteSure = -1;
            })
        } else {
            this.deleteSure = postId;
        }
    }



}
