import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  data

  @Output()
  deleteEmitter = new EventEmitter()


  constructor() { }

  ngOnInit(): void {
  }


  isOwner(data){
    if(data.creator._id == localStorage.getItem('_id')){
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

  showConfirm(data) {
    if(data.toggleConfirm != true){
      data.toggleConfirm = true
    }
    else{
      data.toggleConfirm = false
    }
  }

  delete() {
    this.deleteEmitter.emit(true)
  }



}
