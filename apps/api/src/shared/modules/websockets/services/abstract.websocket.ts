import { HttpMethod } from '@api/constants';
import { Inject, Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketUsersService } from './websocket-users.service';
import { WebsocketService } from './websocket.service';
import { LOGGER } from '@api/shared/modules/logger/constants';

@WebSocketGateway({
    transports: ['websocket'],
    cors: {
        origin: true,
        methods: [HttpMethod.GET, HttpMethod.POST],
        credentials: true,
    },
})
export class AbstractWebsocket implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    public constructor(
        @Inject(LOGGER) protected readonly logger: Logger,
        protected readonly websockerUsers: WebsocketUsersService,
        protected readonly websocketService: WebsocketService,
    ) {}

    public afterInit(): void {
        this.logger.debug('Websocker server is started');

        console.log('this.server', this.server.sockets);

        this.websocketService.setWebsocket(this.server);

        // Auth
    }

    public handleConnection(client: Socket): void {
        const user = client.handshake.query.userId;

        const conntectedUser = this.websockerUsers.add(user as string, client.id);

        if (conntectedUser.rooms.length > 0) {
            conntectedUser.rooms.forEach((r) => this.onRoomJoin(client, r));
        }

        // Make the user join a room with the same id as the user id, to allow emitting messages
        // to all connections for the user
        this.websockerUsers.join(user as string, user as string);
        this.logger.debug(`User ${user} with client id ${client.id} connected.`);
    }

    public handleDisconnect(client: Socket): void {
        const connectedUser = this.websockerUsers.findByConnection(client.id);

        if (!connectedUser) {
            return;
        }

        this.websockerUsers.remove(connectedUser.userId, client.id);

        this.logger.debug(`User ${connectedUser.userId} with client id ${client.id} disconnected.`);
    }

    public onRoomJoin(client: Socket, payload: string): void {
        console.log('onRoomJoin called with payload :', payload);

        const connectedUser = this.websockerUsers.findByConnection(client.id);

        if (!connectedUser) {
            return;
        }

        this.websockerUsers.join(connectedUser.userId, payload);

        console.log('connectedUser.rooms', connectedUser.rooms);
        client.join(payload);

        this.logger.debug(`User ${connectedUser.userId}/${client.id} joined room ${payload}.`);
    }

    public onRoomLeave(client: Socket, room: string): void {
        const connectedUser = this.websockerUsers.findByConnection(client.id);

        if (!connectedUser) {
            return;
        }

        client.leave(room);

        this.logger.debug(`User ${connectedUser.userId}/${client.id} left room ${room}.`);
    }
}
