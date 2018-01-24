const chalk = require('chalk');
const fs = require('fs');

class Parser {

    constructor(filePath, action) {
        
        if (filePath) {
            this.text = fs.readFileSync(filePath).toString();
        }
        else {
            this.text = "";
        }

        if (action) {
            this.action = action
        }
        else {
            this.action = this.defaultAction
        }

        this.parserMode = false;
    }

    defaultAction(symbol) {
        return chalk.red(symbol);
    }

    parse() {
        for (var i = 0; i < this.text.length; i++) {
            let symbol = this.text[i];

            switch (symbol) {
                case "<":
                    this.parserMode = true;
                    break;
                case ">":
                    this.parserMode = false;
                    break;
                default:
                    if (this.parserMode) {
                        symbol = this.action(symbol);
                    }
                    process.stdout.write(symbol);
                    break;
            }
        }
        process.stdout.write('\n');
    }
}

var myCodeParser = new Parser('./code.txt');
var myHTMLParser = new Parser('./index.html', (symbol) => { return chalk.blue(symbol) });

console.log(myCodeParser);
console.log(myHTMLParser);