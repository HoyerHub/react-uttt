import io from 'socket.io-client';

class mpEngine {
    enterQueue = () => {
      if(this.mpState > 0) return;
      this.mpState = 1;
      this.socket.emit("uttt.enterMatchmaking");
    };

    leaveQueue = () => {
        if(this.mpState !== 1) return;
        this.mpState = 0;
        this.socket.emit("uttt.leaveMatchmaking");
    };

    makeMove = (move) => {
      if (!this.socket.connected) return;
      this.socket.emit("uttt.move", move);
    };

    constructor(callback){
        this.onEvent = callback;
        this.hasActiveMatch = false;
        this.latency = 0;
        this.socket = io("https://uttt-backend.herokuapp.com");
        this.socket.on("connect", () => {
            if (this.onEvent != null) this.onEvent("connected");
            if (this.mpState === -1){
                this.enterQueue();
            }
            this.socket.emit("ping");
        });
        this.socket.on("disconnect", () => {
            if (this.mpState > 0) this.mpState = -1;
            this.hasActiveMatch = false;
            if (this.onEvent != null) this.onEvent("disconnected");
        });
        this.socket.on("foundMatch", (data) => {
            this.hasActiveMatch = true;
            this.mpState = 2;
            if (this.onEvent != null) this.onEvent("foundMatch", data);
        });
        this.socket.on("userLeft", (data) => {
            this.hasActiveMatch = false;
            this.mpState = -1;
            this.enterQueue();
            this.onEvent("userLeft");
        });
        this.socket.on("newMove", (data)=>{
            if (this.onEvent != null) this.onEvent("newMove", data);
        });
        this.socket.on("pong", (latency) => {
            this.latency = latency;
            if (this.onEvent != null) this.onEvent("pong");
        });
        this.mpState = 0;
    }
}
export default mpEngine;