import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {

    this.http.post('https://http-requests-backend-default-rtdb.firebaseio.com/posts.json',postData).subscribe({
      next:(responseData)=>{
        console.log(responseData);
      }
    });

  }

  onFetchPosts() {

    this.http.get('https://http-requests-backend-default-rtdb.firebaseio.com/posts.json').subscribe({
      next:(responseData)=>{
        console.log(responseData)
      }
    });

  }

  onClearPosts() {
    // Send Http request
  }
}
