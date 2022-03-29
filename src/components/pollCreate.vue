<template>
    <form class="d-flex justify-content-center" @submit.prevent="pollSubmit">
        <div class="col-5 mb-4">
            <div class="row form-group">
                <label class="col-md-2 col-form-label">
                    Question
                </label>
                <div class="col-md-8">
                    <input v-model="poll.question" class="form-control" type="text" placeholder="Poll question">
                </div>
            </div>
            <div class="row form-group">
                <label class="col-md-2 col-form-label">
                    Image
                </label>
                <div class="col-md-8">
                    <input v-model="poll.thumbnail" class="form-control" type="text" placeholder="URL to image">
                </div>
            </div>
            <div class="row form-group">
                <label class="col-md-2 col-form-label">
                    Options
                </label>
                <div class="col-md-8">
                    <div
                        class="input-group mb-3"
                        v-for="(count, idx) in poll.options.length"
                        :key="idx"
                    >
                        <input
                            v-model="poll.options[count-1]"
                            class="form-control"
                            type="text"
                            :placeholder="'Enter Option '+count"
                        >
                        <button
                            type="button"
                            class="btn btn-danger br-tl-0 br-bl-0"
                            v-if="poll.options.length > 1"
                            @click="poll.options.splice(idx-1, 1)"
                        >-
                        </button>
                    </div>
                    <div class="d-flex justify-content-end">
                        <a href="javascript:void(0)" @click="poll.options.push('')">
                            + new option
                        </a>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-outline-success">Submit</button>
            </div>
        </div>
    </form>
</template>

<script>
import Poll from "../models/poll";

export default {
    name: "pollCreate",
    data(){
        return {
            poll: new Poll()
        }
    },
    methods: {
        initPoll(){
            this.poll = new Poll();
            this.poll.options.push("");
            this.poll.createdBy = this.$store.getters['user/user'].id
            // this.poll.voters.push(this.$store.getters['user/user'].id)
        },
      async pollSubmit(){
            if(this.poll.options){
                this.poll.options.forEach((option, index)=>{
                    this.poll.results[index] = 0;
                })
                const response = await this.$store.dispatch('pollB/add', this.poll);
                if(!response.status){
                    alert(response.message)
                }else{
                    this.initPoll();
                }
            }
      }
    },
    created() {
        this.initPoll();
    }
}
</script>

<style scoped>
    .br-tl-0{
        border-top-left-radius: 0!important;
    }
    .br-bl-0{
        border-bottom-left-radius: 0!important;
    }
</style>