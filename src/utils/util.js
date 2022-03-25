export class CustomResponse{
    constructor() {
        this.data = {};
        this.status = true;
        this.message = "";
    }

    onError(message){
        this.status = false;
        this.message = message
    }
}

export default {
    CustomResponse
}