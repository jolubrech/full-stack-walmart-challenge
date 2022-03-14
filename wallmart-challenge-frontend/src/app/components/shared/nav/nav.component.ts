import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() cleanCart: EventEmitter<any> = new EventEmitter();
  faCartArrowDown = faCartArrowDown;
  constructor() { }

  ngOnInit(): void {
  }


  cleanShoppingCart() {
    this.cleanCart.emit(null);
  }

}
