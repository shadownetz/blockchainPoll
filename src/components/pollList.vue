<template>
    <div class="container-fluid">
        <div class="row pollList">
            <div class="col-12 mb-3" @click="$emit('selected', poll)" v-for="(poll, idx) in poll_list" :key="idx">
                <div class="card pl-list">
                    <img :src="poll.data.thumbnail" class="card-img-top" alt="">
                    <div class="card-body">
                        <!--                <h5 class="card-title">-->
                        <!--                    Cats or Dogs?-->
                        <!--                </h5>-->
                        <h6 class="card-subtitle mb-2 text-muted">Poll</h6>
                        <p class="card-text font-weight-bold">
                            {{poll.data.question}}
                        </p>
                        <div class="d-flex text-muted justify-content-between">
                            <p>{{Object.entries(poll.data.results).map(result=>result[1]).reduce((prev, curr)=>prev+curr, 0)}} Votes</p>
                            <p v-if="poll.data.voters.includes(address)">
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
import {mapGetters} from "vuex"


export default {
    name: "pollList",
    data(){
        return {
           // poll_list: []
        }
    },
    computed: {
      ...mapGetters({
          poll_list: 'pollB/polls',
          user: 'user/user',
          address: 'userB/address'
      }),
    },
    methods: {

    },
    created() {
        // this.$store.dispatch('poll/fetch')
        this.$store.dispatch('pollB/fetch')
    }
}
</script>

<style scoped>
.pollList .pl-list:hover{
    cursor: pointer;
}
</style>