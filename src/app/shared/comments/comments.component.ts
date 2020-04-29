import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CommentsService } from './comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {

  @Input()
  comments: any

  @Output()
  reloadFeed = new EventEmitter();

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
  }

  checkUpvoted(upvoteList) {
    return upvoteList.find(upvote => upvote._id == localStorage.getItem('_id') )
  }

  
  upvoteComment(id) {
    return this.commentsService.upvoteComment(id)
              .subscribe( (res: {data: any, extensions, errors}) => {
                this.reloadFeed.emit(true)
              })
  }

  
  updateComment(text: string, postID: string){
    return this.commentsService.updateComment(text, postID,)
    .subscribe( (res: {data: any, extensions, errors}) => {
      if(res.errors){
        console.log(res.errors)
      }
      this.reloadFeed.emit(true)
    })
  }
  deleteComment(commentID: string){
    let r = confirm("Certeza?");
    if (r == true) {
      return this.commentsService.deleteComment(commentID)
      .subscribe( (res: {data: any, extensions, errors}) => {
        if(res.errors){
          console.log(res.errors)
        }
        this.reloadFeed.emit(true)
      })
    } 
    
  }

  
  toggleEdit(comment){
    if(comment.toggleEdit != true){
      comment.toggleEdit = true
    }
    else{
      comment.toggleEdit = false
    }
  }

  isOwner(comment){
    if(comment.creator._id == localStorage.getItem('_id')){
      return true
    }
    else{
      return false
    }
  }

}
