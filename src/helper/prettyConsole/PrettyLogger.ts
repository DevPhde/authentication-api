export class Logger {
    static prettyLog(message: String | Object) {
        console.log(
            `===============================================
                    ${message}                       
===============================================`)
    }
}