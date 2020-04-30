import { HomeService } from './home.service';
import { Component, OnInit, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input()
  user: string

  @Input()
  singlePost: string

  posts: any[] = []
  page = 0

  loadingFeed = false

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getFeed()
  }

  getFeed(){
    this.loadingFeed = true
    if(this.user){
      return this.homeService.getPostsByUsername(this.user, this.page)
        .subscribe( (res:  {data: any}) => {
          this.posts = this.posts.concat(res.data.postsByUser)
          this.loadingFeed = false
        })
    }
    else if(this.singlePost){
      return this.homeService.getPostByID(this.singlePost)
        .subscribe( (res:  {data: any}) => {
          this.posts = [res.data.postByID]
          console.log(this.posts)
          this.loadingFeed = false
        })
    }
    else{
      return this.homeService.getAllPosts(this.page)
        .subscribe( (res:  {data: any}) => {
          this.posts = this.posts.concat(res.data.posts)
          this.loadingFeed = false
        })
    }

  }

  addPost(post){
    this.posts.unshift(post)
  }

  upvotePost(post) {
    return this.homeService.upvotePost(post._id)
              .subscribe( (res: {data: any, extensions, errors}) => {
                post.upvotes = res.data.upvotePost.upvotes
              })
  }

  makeComment(post: any, comment){
    return this.homeService.createComment(post._id, comment.value)
    .subscribe( (res: {data: any, extensions, errors}) => {
      if(res.errors){
        console.log(res.errors)
      }
      else{
        post.comments.push(res.data.createComment)
      }
      comment.value = ''

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
        post.text = res.data.updatePost.text
      }
      post.loading = false
    })
  }

  deletePost(post: any){
    return this.homeService.deletePost(post._id)
    .subscribe( (res: {data: any, extensions, errors}) => {
      if(res.errors){
        console.log(res.errors)
      }
      else {
        let index = this.posts.findIndex( data => data._id == post._id)
        this.posts.splice(index, 1)
      }
    })
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.page++
      this.getFeed()
    }
  }



}
