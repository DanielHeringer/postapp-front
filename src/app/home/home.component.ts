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
    return this.homeService.getAllPosts(this.page)
      .subscribe( (res: any) => {
        this.posts = res.data.posts
      })
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
  
  updatePost(text: string, post: any){
    post.loading = true
    return this.homeService.updatePost(text, post._id)
    .subscribe( (res: {data: any, extensions, errors}) => {
      if(res.errors){
        console.log(res.errors)
      }
      else {
        this.getFeed()
      }
      post.loading = false
    })
  }

  deletePost(postID: string){
    let r = confirm("Certeza?");
    if (r == true) {
      return this.homeService.deletePost(postID)
      .subscribe( (res: {data: any, extensions, errors}) => {
        if(res.errors){
          console.log(res.errors)
        }
        this.getFeed()
      })
    } 
    
  }

  isOwner(post){
    if(post.creator._id == localStorage.getItem('_id')){
      return true
    }
    else{
      return false
    }
  }
  
  
  toggleEdit(data){
    if(data.toggleEdit != true){
      data.toggleEdit = true
    }
    else{
      data.toggleEdit = false
    }
  }



}
