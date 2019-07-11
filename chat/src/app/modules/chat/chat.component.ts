import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { Message } from 'src/app/models/message';
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
  public messages: Message[] = [];
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
    this.chatService.getMessages().pipe(take(1)).toPromise().then(
      messages => {
        this.loading = false;
        console.log(messages);
        this.messages = messages ? messages : [];
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
            }
            // if (users > 10) {
            //   this.chatService.getUsersClose();
            // } else {
            //   this.usersOnline = users;
            // }
          }
        );

        this.userService.setStatus(this.auth.user._id, true);
      },
      error => {
        this.loading = false;
      }
    );
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
