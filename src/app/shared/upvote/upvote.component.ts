import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.scss']
})
export class UpvoteComponent implements OnInit {

  @Input()
  data: any

  @Output()
  upvoteEmitter = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  emitUpvote(){
    this.upvoteEmitter.emit(true)
  } 

  checkUpvoted(upvoteList) {
    return upvoteList.find(upvote => upvote._id == localStorage.getItem('_id') )
  }


}
