<template>
    <div>
        <top-nav @toggleForm="showForm=!showForm"/>

        <section class="jumbotron text-center">
            <h3>Polls Rethinked</h3>
            <p class="text-muted">Powered by blockchain</p>
        </section>

        <poll-create v-if="showForm"/>

        <div class="d-flex">
            <div class="container poll-list">
                <poll-list @selected="activePoll=$event"/>
            </div>
            <div class="container poll-details">
                <poll-detail :poll="activePoll" v-if="activePoll"/>
            </div>
        </div>
    </div>
</template>

<script>
import topNav from "@/components/topNav";
import pollCreate from "@/components/pollCreate";
import pollList from "@/components/pollList";
import pollDetail from "../components/pollDetail";

export default {
    name: 'Home',
    data(){
      return {
          showForm: false,
          activePoll: null
      }
    },
    components: {
        topNav,
        pollCreate,
        pollList,
        pollDetail
    }
}
</script>

<style scoped>
.poll-list{
    max-width: 400px;
    height: 700px;
    max-height: 700px;
    overflow: auto;
}
.poll-details{
    height: 700px;
    max-height: 700px;
    overflow: auto;
}
</style>
