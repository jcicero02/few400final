import { OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;

    async handleConnection() {
        console.log('got a connection');
        this.server.emit('info', 'holy crap! got another connection! wow! awesome!');
    }

    async handleDisconnect() {
        console.log('got a disconnection');
    }

    @SubscribeMessage('chat')
    async onChat(client: any, message: string) {
        const chatMessage: any = JSON.parse(message);
        console.log(`Got ${chatMessage.message} by ${chatMessage.by}`);
        client.broadcast.emit('chat', message); // send this back out to everyone else.
    }
}