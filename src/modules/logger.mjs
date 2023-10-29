export class Logger {

    constructor (name) {
        this.name = name;
    }

    error (message) {
        if (canLog(0)) console.error(`ERROR   [${this.name}] ${message}`);
    }

    warn (message) {
        if (canLog(1)) console.warn(`WARN    [${this.name}] ${message}`);
    }

    info (message) {
        if (canLog(2)) console.info(`INFO    [${this.name}] ${message}`);
    }

    debug (message) {
        if (canLog(3)) console.debug(`DEBUG   [${this.name}] ${message}`);
    }

    trace (message, obj) {
        if (canLog(4)) {

            if (obj) {

                console.info(`TRACE   [${this.name}] ${message}`);
                console.trace(obj);

            } else {

                if (typeof message === 'object') {
                    console.trace(message);
                } else {
                    console.trace(`TRACE   [${this.name}] ${message}`);
                }

            }

        }
    }

}

function canLog(level) {

    /* Log Levels: 

    0: Errors
    1: Errors, Warnings
    2: Errors, Warnings, Info
    3: Errors, Warnings, Info, Debug
    4: Errors, Warnings, Info, Debug, Trace

    */

    if (process.env.LOG_LEVEL || 2 >= level) return true;
    else return false;
    

}