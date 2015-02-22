function SyntaxError(message) {
    this.message = message;
    // Use V8's native method if available, otherwise fallback
    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, SyntaxError);
    else
        this.stack = (new Error()).stack;
}

SyntaxError.prototype = Object.create(Error.prototype);
SyntaxError.prototype.name = "SyntaxError";
SyntaxError.prototype.constructor = SyntaxError;

exports.SyntaxError = SyntaxError;
