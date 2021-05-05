<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 mb-3" v-for="(poll, idx) in poll_list" :key="idx">
                <div class="card">
                    <img :src="poll.image" class="card-img-top" alt="">
                    <div class="card-body">
                        <!--                <h5 class="card-title">-->
                        <!--                    Cats or Dogs?-->
                        <!--                </h5>-->
                        <h6 class="card-subtitle mb-2 text-muted">Poll</h6>
                        <p class="card-text font-weight-bold">
                            {{poll.question}}
                        </p>
                        <div class="d-flex text-muted justify-content-between">
                            <p>{{poll.votes}} Votes</p>
                            <p v-if="poll.voted">
                                <span class="badge badge-success">voted</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {PollComponentModel} from "@/models/models";
import cat_dog_image from "../assets/images/cat_dog.jpg"
import summer_image from "../assets/images/summer.jpg"


export default {
    name: "pollList",
    data(){
        return {
           poll_list: []
        }
    },
    methods: {
        generatePollList(){
            this.poll_list = [
                new PollComponentModel(
                    'Do you like cats or dogs?',
                    10,
                    true,
                    cat_dog_image
                ),
                new PollComponentModel(
                    'Best month for summer holidays?',
                    20,
                    false,
                    summer_image
                )
            ];

        }
    },
    created() {
        this.generatePollList()
    }
}
</script>

<style scoped>

</style>