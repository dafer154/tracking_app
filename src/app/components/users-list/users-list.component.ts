import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public users: any[] = [];
  public popup: boolean;

  constructor(private $userService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.popup = false;
  }

  getAllUsers(): void {
    this.$userService.getUserAll().subscribe(res => {
      console.log(res);
      this.users = res.body;
    }, err => {
      console.error(err);
    });
  }

  parseDate(date: string) {
    return new Date(date);
  }

  public subStringCustom(title, num): string {
    if (title.length >= num) {
      return title.substring(0, num) + '...';
    }
    if (title.length < num) {
      return title.substring(0, num);
    }
  }

  public editUsers() {
    this.popup = true;
  }

}
