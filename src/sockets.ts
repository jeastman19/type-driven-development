interface IConnectedSocket {
    disconnect(): IDisconnectedSocket;
    emit(event: string): void;
}

interface IDisconnectedSocket {
    connect(): IConnectedSocket;
}

class ConnectedSocket implements IConnectedSocket {
    constructor(private readonly disconnectSocket: IDisconnectedSocket) {
        console.log('Se conectó el socket');
    }

    disconnect(): IDisconnectedSocket {
        console.log('Se desconectó el socket');
        return this.disconnectSocket;
    }

    emit(event: string) {
        console.log(`Se emitió el evento: ${event}`);
    }
}

export type Socket = IConnectedSocket | IDisconnectedSocket;
export class DisconnectedSocket implements IDisconnectedSocket {
    connect(): IConnectedSocket {
        console.log('Conectando el socket');

        return new ConnectedSocket(this);
    }
}
