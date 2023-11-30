import io, { Socket } from "socket.io-client";

export class SocketApi {
  static socket: Socket | null = null;

  static sendMessage(message: string, dto: any) {
    this.socket?.emit(message, dto);
  }

  static createListenner(message: string, callback: (...args: any[]) => void) {
    this.socket?.on(message, callback);
  }

  static createConnection = (onConnected?: (state: boolean) => void) => {
    if (this.socket) return this;
    
    this.socket = io("http://localhost:5000/");

    this.socket.on("connect", () => {
      console.log("connected");
      onConnected?.(true);
    });

    this.socket.on("disconnect", () => {
      console.log("disconnected");
      onConnected?.(false);
    });

    return this;
  };

  static disconnect = () => {
    if (!this.socket) return;

    this.socket.close();
    this.socket = null;
    return this;
  };
}
