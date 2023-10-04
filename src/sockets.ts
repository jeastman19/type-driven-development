interface IConnectedSocket {
  disconnect(): IDisconnectedSocket;
  emit(event: string): void;
}

interface IDisconnectedSocket {
  connect(): IConnectedSocket;
}

export type Socket = IConnectedSocket | IDisconnectedSocket;

class ConnectedSocket implements IConnectedSocket {
  constructor(private readonly disconnectSocket: DisconnectedSocket) {
    console.log("Se conectó el socket");
  }

  disconnect(): IDisconnectedSocket {
    console.log("Se desconectó el socket");
    return this.disconnectSocket;
  }

  emit(event: string) {
    console.log(`Se emitió el evento: ${event}`);
  }
}

export class DisconnectedSocket implements IDisconnectedSocket {
  connect(): ConnectedSocket {
    console.log("Conectando el socket");
    return new ConnectedSocket(this);
  }
}
