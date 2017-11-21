// function
function logMessage(message) {
    console.log(message);
}

export { logMessage };

// constants
export const MAX_USERS = 3;
export const MAX_REPLIES = 5;

// class
class FlashMessage {
    constructor(message) {
        this.message = message;
    }

    renderLog() {
        console.log(`${this.message} from FlashMessage class`);
    }
}

export { FlashMessage };
