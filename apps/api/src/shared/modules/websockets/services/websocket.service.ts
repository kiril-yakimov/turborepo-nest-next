import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class WebsocketService {
    private static websocket: Server | null = null;

    public setWebsocket(websocket: Server): void {
        WebsocketService.websocket = websocket;
    }

    public getWebsocket(): Server | null {
        return WebsocketService.websocket;
    }
}
