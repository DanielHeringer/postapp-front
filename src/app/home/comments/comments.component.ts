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

}
