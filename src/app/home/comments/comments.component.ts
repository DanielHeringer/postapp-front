import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input()
  comments: any

  constructor() { }

  ngOnInit(): void {
  }

  checkUpvoted(upvoteList) {
    return upvoteList.find(upvote => upvote._id == localStorage.getItem('_id') )
  }

}
