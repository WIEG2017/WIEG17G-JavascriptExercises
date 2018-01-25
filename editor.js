const fs = require('fs');
const prompt = require('cli-prompt');

module.exports = class Editor {
    constructor() {
        this.filename = undefined;
    }

    askForFilename(callback) {
        this.askWithPrompt('enter what filename to use: ', (text) => {
            this.filename = text;
            callback();
        });
    }

    askWithPrompt(question, callback) {
        prompt(
            question,
            (text) => {
                callback(text);
            },
            (err) => {
                console.error('Unable to prompt: ' + err);
            }
        );
    }

    askForContent(callback) {
        if (this.filename == undefined) {
            this.askForFilename(() => {
                this.askWithPrompt('enter what content to write: ', (text) => {
                    fs.writeFileSync(this.filename, text);
                    callback();
                });
            });
        }
        else {
            this.askWithPrompt('enter what content to write: ', (text) => {
                fs.writeFileSync(this.filename, text);
                callback();
            });
        }
    }
}