import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() filterValue=new EventEmitter()
  value:string=""
  constructor() { }

  ngOnInit(): void {
  }

  sendFilterValue()
  {
    // this.filterValue.emit(value.target.value)
    this.filterValue.emit(this.value)
  }
}
