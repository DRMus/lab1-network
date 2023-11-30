import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { maHash10Generator, parkMillerWithHash, shaffler } from './utils/encrypt';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  @SubscribeMessage('hello')
  sayHello(@MessageBody() dto: any, @ConnectedSocket() client: any) {
    if (!('variant' in dto)) {
        const errorData = {message: "Wrong DTO"}
        client.emit('error', errorData);
        return;
    }

    const res = {message: `hello variant ${dto.variant}`}
    client.emit('hello-res', res);
  }

  @SubscribeMessage('bye')
  sayBye(@MessageBody() dto: any, @ConnectedSocket() client: any) {
    if (!('variant' in dto)) {
        const errorData = {message: "Wrong DTO"}
        client.emit('error', errorData);
        return;
    }

    const res = {message: `bye variant ${dto.variant}`}
    client.emit('bye-res', res);
  }

  @SubscribeMessage('encrypt')
  Encrypt(@MessageBody() dto: any, @ConnectedSocket() client: any) {
    if (!('message' in dto) || !('key' in dto)) {
        const errorData = {message: "Wrong DTO"}
        client.emit('error', errorData);
        return;
    }

    let tempHash = maHash10Generator(dto.key);
    let tempPmHash = parkMillerWithHash(tempHash).join("");

    const answer = shaffler(dto.message, tempPmHash);

    const res = {message: `${answer}`}
    client.emit('encrypt-res', res);
  }

  @SubscribeMessage('decrypt')
  Decrypt(@MessageBody() dto: any, @ConnectedSocket() client: any) {
    if (!('message' in dto) || !('key' in dto)) {
        const errorData = {message: "Wrong DTO"}
        client.emit('error', errorData);
        return;
    }

    let tempHash = maHash10Generator(dto.key);
    let tempPmHash = parkMillerWithHash(tempHash).join("");

    const answer = shaffler(dto.message, tempPmHash);

    const res = {message: `${answer}`}
    client.emit('decrypt-res', res);
  }

  handleDisconnect(client: any) {
    console.log('disconnect: ', client.client.id);
  }

  handleConnection(client: any) {
    console.log('connected: ', client.client.id);
  }
}
