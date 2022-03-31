<template>
    <div class="row">
        <div class="col-12">
            <div class="card mb-3" v-if="!poll.data.voters.includes(address)">
                <img :src="poll.data.thumbnail" class="card-img-top" alt="poll image">
                <div class="card-body">
                    <h5 class="card-title">{{poll.data.question}}</h5>
                    <p class="card-text">
                        Created at {{toDate(poll.data.createdAt)}}
                    </p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="(option, idx) in poll.data.options" :key="'poll_d'+idx">
                       {{option}}
                        <span class="float-md-right">
                            <button class="btn btn-sm btn-primary" @click="castVote(idx)">vote</button>
                        </span>
                    </li>
                </ul>
<!--                <div class="card-body">-->
<!--                    <a href="#" class="card-link">Card link</a>-->
<!--                    <a href="#" class="card-link">Another link</a>-->
<!--                </div>-->
            </div>
            <div class="apx-chrt" v-else>
                <apexchart type="bar" :options="chart.options" :series="chart.series"></apexchart>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: "pollDetail",
    props: ['poll'],
    data(){
        return {
            chart: {
                options: {
                    chart: {
                        id: 'vuechart-example'
                    },
                    xaxis: {
                        categories: this.poll.data.options
                    }
                },
                series: [{
                    name: 'series-1',
                    data: Object.entries(this.poll.data.results).map(result=>result[1])
                }]
            }
        }
    },
    watch: {
        poll: function(newVal){
            this.chart = {
                options: {
                    chart: {
                        id: 'vuechart-example'
                    },
                    xaxis: {
                        categories: newVal.data.options
                    }
                },
                series: [{
                    name: 'series-1',
                    data: Object.entries(newVal.data.results).map(result=>result[1])
                }]
            }
        }
    },
    computed:{
        ...mapGetters({
            user: 'user/user',
            address: 'userB/address'
        })
    },
    methods: {
       async castVote(selectedIdx){
            const status = confirm("Proceed with selection?");
            if(status){
                const {poll} = this;
                const response = await this.$store.dispatch('pollB/vote', {
                    poll, selectedIdx
                });
                if(response.status){
                    alert("Operation successfully")
                }else{
                    alert(response.message);
                }
            }
        },
        toDate(value){
           if(typeof value === 'number'){
               const _date = new Date(0);
               _date.setUTCSeconds(value)
               return _date
           }else{
               return value.toDate();
           }
        }
    },
}
</script>

<style scoped>
.apx-chrt{
    height: 700px
}
</style>