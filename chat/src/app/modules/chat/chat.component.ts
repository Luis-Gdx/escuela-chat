import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  @ViewChild('trigger', { static: false }) customTrigger: TemplateRef<void>;

  public message = '';
  public messages = [];
  public users: User[] = [];
  public loading = true;
  public usersOnline = null;

  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  constructor(
    public auth: AuthService,
    public chatService: ChatService,
    public userService: UsersService,
  ) { }

  ngOnInit() {
    // this.loading = true;
    this.chatService.receiveChat(
      (message) => {
        console.log(message);
        console.log(this.messages);
        this.messages = [...this.messages, message];
        console.log(this.messages);
      }
    );

    this.chatService.getUsers(
      (users: number) => {
        console.log(users);
        this.getUsers();
        if (!this.usersOnline) {
          this.usersOnline = users;
          this.loading = false;
        }
        // if (users > 10) {
        //   this.chatService.getUsersClose();
        // } else {
        //   this.usersOnline = users;
        // }
      }
    );

    this.userService.setStatus(this.auth.user._id, true);
  }

  chatItenOnMouseOver(el, out) {
    console.log(el);
    if (!out) {
      el.innerHTML += ':v';
    } else {
    }
  }

  async getUsers() {
    try {
      const users: User[] = await this.userService.getUsers().toPromise();
      this.users = users;
      console.log(users);
    } catch (error) {

    }
  }

  sendMessage() {
    if (this.message) {
      console.log(this.message);
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

}
