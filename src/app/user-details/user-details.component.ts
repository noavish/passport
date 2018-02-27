import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  username: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserName().subscribe(
      user => {
        this.username = user.username;
      },
      error => {
        console.log(error);
      });
  }

}
