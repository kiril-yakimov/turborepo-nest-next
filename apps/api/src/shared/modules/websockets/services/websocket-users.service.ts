import { Injectable } from '@nestjs/common';
import { ConnectedUser } from '../types';

@Injectable()
export class WebsocketUsersService {
    private readonly connectedUsers: ConnectedUser[] = [];

    private findIndex(user: string): number {
        return this.connectedUsers.findIndex((i) => i.userId === user);
    }

    public findByConnection(connection: string): ConnectedUser | undefined {
        return this.connectedUsers.find((i) => i.connections.includes(connection));
    }

    public add(userId: string, connection: string): ConnectedUser {
        const connectedUserIndex = this.findIndex(userId);

        if (connectedUserIndex === -1) {
            const newUser: ConnectedUser = {
                userId,
                connections: [connection],
                rooms: [],
            };
            this.connectedUsers.push(newUser);
            return newUser;
        }

        const connectedUser = this.connectedUsers[connectedUserIndex];
        connectedUser.connections.push(connection);

        return connectedUser;
    }

    public get(userId: string): ConnectedUser | null {
        return this.connectedUsers.find((user) => user.userId === userId) || null;
    }

    public remove(userId: string, connection: string): boolean {
        const connectedUserIndex = this.findIndex(userId);

        if (connectedUserIndex === -1) {
            return false;
        }

        const connectedUser = this.connectedUsers[connectedUserIndex];

        if (connectedUser.connections.length === 1) {
            this.connectedUsers.splice(connectedUserIndex, 1);
            return true;
        }

        const connectionIndex = connectedUser.connections.indexOf(connection);
        if (connectionIndex > -1) {
            connectedUser.connections.splice(connectionIndex, 1);
        }

        return true;
    }

    public join(user: string, room: string): ConnectedUser {
        const connectedUserIndex = this.findIndex(user);

        if (connectedUserIndex === -1) {
            throw new Error(`Cannot find connected user with id ${user}`);
        }

        const connectedUser = this.connectedUsers[connectedUserIndex];

        if (!connectedUser.rooms.includes(room)) {
            connectedUser.rooms.push(room);
        }

        return connectedUser;
    }

    public leave(user: string, room: string): ConnectedUser {
        const connectedUserIndex = this.findIndex(user);

        if (connectedUserIndex === -1) {
            throw new Error(`Cannot find connected user with id ${user}`);
        }

        const connectedUser = this.connectedUsers[connectedUserIndex];
        const roomIndex = connectedUser.rooms.indexOf(room);

        if (roomIndex > -1) {
            connectedUser.rooms.splice(roomIndex, 1);
        }

        return connectedUser;
    }

    public all(): ConnectedUser[] {
        return this.connectedUsers;
    }
}
