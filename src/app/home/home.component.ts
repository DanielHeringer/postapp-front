import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  posts: any[]
  page: number = 0 

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getFeed()
  }
  
  getFeed(){
    this.homeService.getAllPosts(this.page)
      .subscribe( (res: any) => {
        this.posts = res.data.posts
        console.log(this.posts)
      })
  }

  checkUpvoted(upvoteList) {
    return upvoteList.find(upvote => upvote._id == localStorage.getItem('_id') )
  }

  upvoteComment(id) {

  }
  
  upvotePost(id) {
    return this.homeService.upvotePost(id)
              .subscribe( (res: {data: any, extensions, errors}) => {
                console.log(res)
              })
  }


}
