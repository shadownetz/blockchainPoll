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
                <poll-list/>
            </div>
            <div class="container poll-details">
                <h5>Detail</h5>
            </div>
        </div>
    </div>
</template>

<script>
import topNav from "@/components/topNav";
import pollCreate from "@/components/pollCreate";
import pollList from "@/components/pollList";

export default {
    name: 'Home',
    data(){
      return {
          showForm: false
      }
    },
    components: {
        topNav,
        pollCreate,
        pollList
    }
}
</script>

<style scoped>
.poll-list{
    max-width: 400px;
}
</style>
