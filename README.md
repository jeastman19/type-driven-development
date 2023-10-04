# Ejemplo de Type-Driven Development

Luego de ver, en varias ocasiones, el vídeo [Si usas TYPESCRIPT, DEBERÍAS tener MENOS TESTS][si usas typescript, deberías tener menos tests] del canal [BettaTech][betta-tech], me quedé pensando cómo poder reducir el consumo de recursos por la creación de multiples instancias de las clasas involucradas, así probé y este fue el resultado.

## De qué se trata este proyecto?

Este es un proyecto simple en nodejs y TypeScript con el fin de aprender a utilizar **_Type-Driven Development_**, en este caso se crea una clase que simula un socket y el cual no permite emitir mensajes hasta que se haya conectado.

Vamos a desglosar y explicar el código paso a paso.

### src/sockets.ts

**1. Interfaces `IConnectedSocket` e `IDisconnectedSocket`:**

Estas interfaces definen las características y métodos que deben tener los sockets conectados (`IConnectedSocket`) y desconectados (`IDisconnectedSocket`).

- `IConnectedSocket`: Tiene dos métodos:

  - `disconnect()`: Devuelve una instancia de un socket desconectado.
  - `emit(event: string)`: Emite un evento.

- `IDisconnectedSocket`: Tiene un método:
  - `connect()`: Devuelve una instancia de un socket conectado.

**2. Tipo `Socket`:**

Este es un tipo unión que indica que un socket puede estar en uno de dos estados: conectado o desconectado.

**3. Clase `ConnectedSocket`:**

Esta clase implementa la interfaz `IConnectedSocket` y representa un socket que está conectado.

- En el constructor se imprime un mensaje de que el socket se ha conectado y toma como argumento una instancia de `DisconnectedSocket`.
- El método `disconnect()` cambia el estado del socket a desconectado y devuelve la instancia de `DisconnectedSocket` que se pasó al constructor.

- El método `emit()` imprime el evento que se está emitiendo.

**4. Clase `DisconnectedSocket`:**

Esta clase implementa la interfaz `IDisconnectedSocket` y representa un socket que está desconectado.

- El método `connect()` imprime un mensaje y crea una nueva instancia de `ConnectedSocket`, pasándose a sí mismo como argumento.

### src/index.ts

Este archivo utiliza las clases y tipos definidos en `sockets.ts`.

**1.** Se importan las clases y tipos necesarios.

**2.** Se crea una instancia de un `DisconnectedSocket`.

**3.** Se imprime el nombre del constructor de la instancia `socket` (en este caso, será "DisconnectedSocket").

**4.** Se conecta el socket utilizando el método `connect()` y se reasigna a la variable `socket`.

**5.** Se imprime el nombre del constructor de la nueva instancia `socket` (ahora será "ConnectedSocket").

**6.** Se emite un evento llamado "saludo".

**7.** Se desconecta el socket utilizando el método `disconnect()` y se reasigna a la variable `socket`.

**8.** Se imprime nuevamente el nombre del constructor de la instancia `socket`, volviendo a ser "DisconnectedSocket".

**9.** Ahora, al final de `src/index.ts`, agregue la siguiente línea:

```ts
socket.emit("hola...");
```

he intente ejecutar el código, el mismo lanza un error similar al siguiente:

<img src="./images//Screenshot from 2023-10-04 20-34-19.png">

en el mismo podemos ver que .emit está resaltado y se muestra el mensaje que indica que .emit no existe en la interface `IDisconnectSocket`

```
src/index.ts:22:8 - error TS2339: Property 'emit' does not exist on type 'IDisconnectedSocket'.
```

El motivo? cuando se ha ejecutado la línea

```ts
socket = socket.disconnect();
```

el método `.disconnect` retorna una instancia de la clase `DisconnectedSocket` y éste, no contine el método indicado.

Cómo indica [Betta Tech][betta-tech] en su vídeo, tenemos verificación en tiempo de transpilación.

En resumen, el código demuestra un patrón de diseño donde un objeto (en este caso, un socket) puede cambiar su estado entre conectado y desconectado, y estos estados están representados por diferentes clases.

[si usas typescript, deberías tener menos tests]: https://www.youtube.com/watch?v=K--Lmy8qUCQ&t=4s
[betta-tech]: https://www.youtube.com/@BettaTech
