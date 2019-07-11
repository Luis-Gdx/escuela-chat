import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client } from 'socket.io';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(private messagesService: MessagesService) { }

    @WebSocketServer() server;
    users: number = 0;

    async handleConnection() {

        // A client has connected
        this.users++;

        // Notify connected clients of current users
        this.server.emit('users', this.users > 9 ? false : this.users);

    }

    async handleDisconnect() {

        // A client has disconnected
        this.users--;

        // Notify connected clients of current users
        this.server.emit('users', this.users);

    }

    @SubscribeMessage('chat')
    onChat(client: Client, data) {
        data.createdAt = Date.now();
        this.messagesService.create({ user: data.user._id, content: data.content }).then(
            () => {
                client.server.emit('chat', data);
            }
        );
    }

}