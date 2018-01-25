var Editor = require('./editor.js')
var Parser = require('./parser.js')

const editor = new Editor();

editor.askForContent(() => {
    const parser = new Parser(editor.filename);
    parser.parse();
});