import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CommentDto } from '../model/comment-dto';


@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient){

    }

    getPosts (){
        let url = environment.backendUrl + "post/getAll";
        return new Observable((o: any) => {
            this.http.get(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    saveComment(commentDto : CommentDto){
        let url = environment.backendUrl + "comment/save";
        return new Observable((o: any) => {
            this.http.post(url,commentDto ).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);
            });
        });
    }

    deleteComment(commentId : number){
        let url = environment.backendUrl + "comment/delete/"+commentId;
        return new Observable((o: any) => {
            this.http.delete(url, {} ).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);
            });
        });
    }
}
