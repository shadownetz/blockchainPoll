import {serverTimestamp} from "firebase/firestore";

class Poll{
    constructor(
        id='',
        question='',
        results=[],
        options=[],
        thumbnail='')
    {
        this.id = id;
        this.question = question;
        this.results = results;
        this.options = options;
        this.thumbnail = thumbnail;
        this.voters = [];
        this.createdBy = "";
        this.createdAt = serverTimestamp()
    }

    toJSON(){
        return {
            question : this.question,
            results : this.results,// array of numbers
            options : this.options,
            thumbnail : this.thumbnail,
            voters: this.voters,
            createdBy: this.createdBy,
            createdAt: this.createdAt
        }
    }

}

export default Poll