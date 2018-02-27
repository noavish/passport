import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() addUser: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  openAddUser() {
    this.addUser.emit();
  }

}
