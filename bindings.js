var throttle = require('throttle');

var keys = module.exports = {
  'ctrl+z': function() {
    this.history.undo();
  },
  'ctrl+y': function() {
    this.history.redo();
  },

  'home': function() {
    this.move.beginOfLine();
  },
  'end': function() {
    this.move.endOfLine();
  },
  'pageup': throttle(function() {
    this.move.pageUp();
  }, 60),
  'pagedown': throttle(function() {
    this.move.pageDown();
  }, 60),
  'left': function() {
    this.move.byChars(-1);
  },
  'up': function() {
    this.move.byLines(-1);
  },
  'right': function() {
    this.move.byChars(+1);
  },
  'down': function() {
    this.move.byLines(+1);
  },

  'ctrl+left': function() {
    this.move.byWord(-1);
  },
  'ctrl+right': function() {
    this.move.byWord(+1);
  },

  // 'shift+home': function() {
  //   this.mark.beginOfLine();
  // },
  // 'shift+end': function() {
  //   this.mark.endOfLine();
  // },
  // 'shift+pageup': function() {
  //   this.mark.pageUp();
  // },
  // 'shift+pagedown': function() {
  //   this.mark.pageDown();
  // },
  // 'shift+left': function() {
  //   this.mark.byChars(-1);
  // },
  // 'shift+up': function() {
  //   this.mark.byLines(-1);
  // },
  // 'shift+right': function() {
  //   this.mark.byChars(+1);
  // },
  // 'shift+down': function() {
  //   this.mark.byLines(+1);
  // },
  // 'ctrl+shift+left': function() {
  //   this.mark.byWord(-1);
  // },
  // 'ctrl+shift+right': function() {
  //   this.mark.byWord(+1);
  // },
  'ctrl+a': function() {
    this.move.beginOfFile();
    this.beginSelection();
    this.move.endOfFile();
  },

  'ctrl+shift+up': function() {
    if (!this.mark.active) {
      this.buffer.moveAreaByLines(-1, { begin: this.caret.pos, end: this.caret.pos });
      this.move.byLines(-1);
    } else {
      this.buffer.moveAreaByLines(-1, this.mark.area);
      this.mark.shiftByLines(-1);
      this.move.byLines(-1);
    }
  },
  'ctrl+shift+down': function() {
    if (!this.mark.active) {
      this.buffer.moveAreaByLines(+1, { begin: this.caret.pos, end: this.caret.pos });
      this.move.byLines(+1);
    } else {
      this.buffer.moveAreaByLines(+1, this.mark.area);
      this.mark.shiftByLines(+1);
      this.move.byLines(+1);
    }
  },

  'backspace': function() {
    this.backspace();
  },
  'delete': function() {
    this.delete();
  },
  'ctrl+backspace': function() {
    this.markBegin();
    this.move.byWord(-1);
    this.delete();
  },
  'ctrl+delete': function() {
    this.markBegin();
    this.move.byWord(+1);
    this.delete();
  },

  'tab': function() {
    this.insert('  ');
  },
};

keys.single = {
  'shift:up': function() {
    this.markEnd();
  }
};

// selection keys
[ 'home','end',
  'pageup','pagedown',
  'left','up','right','down',
  'ctrl+left','ctrl+right'
].forEach(function(key) {
  keys['shift+'+key] = function(e) {
    this.markBegin();
    keys[key].call(this, e);
  };
});
