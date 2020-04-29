import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-body',
  templateUrl: './text-body.component.html',
  styleUrls: ['./text-body.component.scss']
})
export class TextBodyComponent implements OnInit {

  @Input()
  data: any

  @Input()
  edit: any

  @Input()
  loading: boolean

  @Output()
  updateEmitter = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    console.log(this.edit)
  }

  updateEmit(text){
    this.updateEmitter.emit(text.value)
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
