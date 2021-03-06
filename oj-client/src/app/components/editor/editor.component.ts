import { Component, OnInit, Inject } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

  editor: any;

  public languages: string[] = ['Java', 'C++', 'Python'];
  language: string = 'Java';  // default language

  sessionId: string;

  output: string;

  defaultContent = {
    'Java': `public class Example {
      public static void main(String[] args) {
        // Type your code here
      }
    }`,
    'C++': `#include <iostream>
    using namespace std;

    int main() {
      // Type your C++ code here
      return 0;
    }`,
    'Python': `class Solution:
    def example():
    # Write your Python code here`
  };

  constructor(@Inject('collaboration') private collaboration,
              private route: ActivatedRoute,
              @Inject('data') private data) { }

  ngOnInit() {
    // use id to distinguish collaboration place
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.initEditor();
    });

  }

  initEditor() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    // this.editor.getSession().setMode('ace/mode/java');
    // this.editor.setValue(this.defaultContent['Java']);

    // if code exceed more than one page, we need to set to int
    this.editor.$blockScrolling = Infinity;

    // once come into the problem page, the mouse focus in the editor, could immediately begin Write
    document.getElementsByTagName('textarea')[0].focus();

    // use for collaborationSocket
    this.collaboration.init(this.editor, this.sessionId);

    // only get diff of code, not all the code
    this.editor.lastAppliedChange = null;

    // bind editor with socket, when change in the editor, sync all participants
    this.editor.on('change', (e) => {
      console.log('editor changes" ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });

    // sync the position of cursor in the editor
    this.editor.getSession().getSelection().on("changeCursor", () => {
      let cursor = this.editor.getSession().getSelection().getCursor();
      console.log('cursor moves: ' + JSON.stringify(cursor));
      this.collaboration.cursorMove(JSON.stringify(cursor));
    });

    // get all the past events to sync
    this.collaboration.restoreBuffer();
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void {
    this.editor.getSession().setMode('ace/mode/' + this.language.toLowerCase());
    this.editor.setValue(this.defaultContent[this.language]);
    this.output = '';
  }

  submit(): void {
    let userCode = this.editor.getValue();
    let data = {
      user_code: userCode,
      lang: this.language.toLowerCase()
    };
    this.data.buildAndRun(data).then(res => {
      this.output = res.text;
    })
    console.log(userCode);
  }

}
