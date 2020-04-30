import { NewPostService } from './new-post.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
})
export class NewPostComponent implements OnInit {

  username = localStorage.getItem('username')
  loading: boolean = false

  @Output()
  createdEmitter = new EventEmitter()

  constructor(private newPostService: NewPostService) { }

  ngOnInit(): void {
  }

  createPost(text){
    this.loading = true
    return this.newPostService.createPost(text.value)
    .subscribe( (res: {data: any, extensions, errors}) => {
      if(res.errors){
        console.log(res.errors)
      }
      text.value = ''
      this.loading = false
      this.createdEmitter.emit(res.data.createPost)
    })
  }

}
