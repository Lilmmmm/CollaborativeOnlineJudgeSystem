import { Injectable } from '@angular/core';

declare var io: any;

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  collaborationSocket: any;

  constructor() { }

  init(): void {
    // first arg: url(current web page)
    // establish connect and send message
    this.collaborationSocket = io(window.location.origin, { query: 'message=' + '123'});

    // when receive message, give response
    this.collaborationSocket.on("message", (message) => {
      console.log("received:" + message);
    });
  }
}
