import { Injectable } from '@angular/core';

declare var io: any;

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  collaborationSocket: any;

  constructor() { }

  init(editor: any, sessionId: string): void {
    // first arg: url(current web page)
    // establish connect and send message
    this.collaborationSocket = io(window.location.origin, { query: 'sessionId=' + sessionId});

    // when code change in the editor
    this.collaborationSocket.on("change", (delta: string) => {
      console.log('collaboration: editor changes by' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    // when receive message, give response
    this.collaborationSocket.on("message", (message) => {
      console.log("received:" + message);
    });
  }

  change(delta: string): void {
    this.collaborationSocket.emit("change", delta);
  }
}
