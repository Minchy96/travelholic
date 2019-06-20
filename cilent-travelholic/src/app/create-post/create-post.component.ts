import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post-service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private postService : PostService) { }

  ngOnInit() {
  }

  

}
