import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
import {PostModel} from "./models/posts.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:PostModel[] = [];

  isFetchingPostsInProgress : boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.fetchPosts();

  }

  onCreatePost(postData: { title: string; content: string }) {

    this.http.post('https://http-requests-backend-default-rtdb.firebaseio.com/posts.json',postData).subscribe({
      next:(responseData)=>{
        console.log(responseData);
      }
    });

  }

  onFetchPosts() {

    this.fetchPosts();

  }

  onClearPosts() {
    // Send Http request
  }

  public fetchPosts(){

    this.isFetchingPostsInProgress = true;

    this.http.get('https://http-requests-backend-default-rtdb.firebaseio.com/posts.json')
      .pipe(map((responseData)=>{
        const postsArray:PostModel[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postsArray.push({...responseData[key],id:key}); // spread operator allows us to combine all properties of response
          }
        }
        return postsArray;
      })).subscribe({
      next:(responseData)=>{
        this.loadedPosts = responseData;
      },
      error:(err)=>{
        this.isFetchingPostsInProgress = false;
      },
      complete:()=>{
        this.isFetchingPostsInProgress = false;
      }
    });

  }

}
