import { Observable } from "rxjs";

export class ChatMessage {
    email? : string;
    // userName? : Observable<string>;
    userName? : string;
    message? : string;
    timeSent? : string; //Date = new Date();
    $key? : string;

    constructor(
        email? : string,
        // userName? : Observable<string>,
        userName? : string,
        message? : string,
        timeSent? : string, // Date
        $key? : string,
    ) {
        this.$key = $key;
        this.email = email;
        this.userName = userName;
        this.message = message;
        this.timeSent = timeSent;
    }
}