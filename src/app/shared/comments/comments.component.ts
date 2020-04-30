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


  upvoteComment(comment) {
    return this.commentsService.upvoteComment(comment._id)
              .subscribe( (res: {data: any, extensions, errors}) => {
                comment.upvotes = res.data.upvoteComment.upvotes
              })
  }


  updateComment(text: string, comment){
    return this.commentsService.updateComment(text, comment._id)
    .subscribe( (res: {data: any, extensions, errors}) => {
      if(res.errors){
        console.log(res.errors)
      }
      else {
        comment.text = res.data.updateComment.text
      }
    })
  }

  deleteComment(commentID: string){
      return this.commentsService.deleteComment(commentID)
      .subscribe( (res: {data: any, extensions, errors}) => {
        if(res.errors){
          console.log(res.errors)
        }
        else{
          let index = this.comments.findIndex( data => data._id == commentID)
          this.comments.splice(index, 1)
        }
      })

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
