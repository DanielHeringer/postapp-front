import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postID: string

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.postID = this.route.snapshot.paramMap.get("id")
  }


}
