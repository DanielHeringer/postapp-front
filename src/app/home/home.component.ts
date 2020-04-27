import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {


  posts: any[]
  page: number = 0 

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getFeed()
  }
  
  getFeed(){
    return this.homeService.getAllPosts(this.page)
      .subscribe( (res: any) => {
        this.posts = res.data.posts
      })
  }

  checkUpvoted(upvoteList) {
    return upvoteList.find(upvote => upvote._id == localStorage.getItem('_id') )
  }

  
  upvotePost(id) {
    return this.homeService.upvotePost(id)
              .subscribe( (res: {data: any, extensions, errors}) => {
                this.getFeed()
              })
  }

  makeComment(postID, comment){
    return this.homeService.createComment(postID, comment)
    .subscribe( (res: {data: any, extensions, errors}) => {
      if(res.errors){
        console.log(res.errors)
      }
      this.getFeed()
    })
  }
}
