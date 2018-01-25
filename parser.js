const chalk = require('chalk');
const fs = require('fs');

module.exports = class Parser {

    constructor(filePath, action) {
        
        if (filePath) {
            this.text = fs.readFileSync(filePath).toString();
        }
        else {
            this.text = "";
        }

        this.parserMode = false;
    }

    action(symbol) {
        return chalk.red(symbol);
    }

    parse() {
        for (var i = 0; i < this.text.length; i++) {
            let symbol = this.text[i];

            switch (symbol) {
                case ">":
                    this.parserMode = false;
                    break;
                    case "<":
                    this.parserMode = true;
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