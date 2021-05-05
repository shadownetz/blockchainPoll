export const PollModel =  class Poll{
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
    }
    id = NaN;
    question = '';
    results = [];   // array of numbers
    options = [];   // array of strings
    thumbnail = '';

}

export const VoterModel = class Voter{
    id = '';
    voted = []; // poll id's

}

export const PollComponentModel = class PollComponent {
    constructor(
        question,
        votes,
        voted,
        image
    ) {
        this.question = question;
        this.votes = votes;
        this.voted = voted;
        this.image = image;
    }
    question = '';
    votes = []; // array of numbers
    voted = false;
    image = '';
}