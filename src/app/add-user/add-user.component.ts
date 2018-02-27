import { Component, OnInit } from '@angular/core';
import { User } from '../userModel';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User = new User();
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  addUser() {
    this.userService.addUserToDB(this.user).subscribe(
      data => {
        console.log("added",data);
      },
      error => {
        console.log(error);
      });
  }

}
