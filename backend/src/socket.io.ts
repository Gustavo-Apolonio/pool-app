import { Server } from 'http';

import express, { NextFunction, Response } from 'express';
import * as SocketIO from 'socket.io';

import { IPoll, IRequest, IUser } from './models';

class AppSocket {
  private io: SocketIO.Server;

  connectedPolls: IPoll[] = [];

  constructor(server: Server, app: express.Application) {
    this.io = new SocketIO.Server(server, {
      cors: { origin: '*', methods: ['GET', 'POST', 'DELETE'] },
    });

    this.configureSockets();

    app.use((req: IRequest, res: Response, next: NextFunction) => {
      req.io = this.io;
      req.connectedPolls = this.connectedPolls;

      return next();
    });
  }

  private configureSockets(): void {
    this.io.on('connection', (socket: SocketIO.Socket) => {
      socket.on(
        'enter-poll',
        ({ pollId, userId }: { pollId: string; userId: string }) => {
          const poll: IPoll | undefined = this.connectedPolls.find(
            (poll: IPoll) => poll.id == pollId
          );

          if (pollId && userId && poll) {
            let connectedUsers: IUser[] = poll.connectedUsers;

            const connectedUser: IUser | undefined = connectedUsers.find(
              (_connectedUser: IUser) => _connectedUser.id == userId
            );

            if (connectedUser) {
              connectedUsers.splice(connectedUsers.indexOf(connectedUser), 1);

              connectedUser.connectionId = socket.id;

              connectedUsers = [...connectedUsers, connectedUser];
            } else {
              connectedUsers = [
                ...connectedUsers,
                { id: userId, connectionId: socket.id },
              ];
            }

            poll.connectedUsers = [...connectedUsers];
          } else {
            this.io.to(socket.id).emit('non-existing-poll');
          }
        }
      );
    });
  }
}

export default AppSocket;
