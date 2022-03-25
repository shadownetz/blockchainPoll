<template>
    <div>
        <top-nav/>
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-6">
                    <h4 class="mb-5">Sign Up</h4>
                    <form @submit.prevent="signUp">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" v-model="signUpData.email" id="exampleInputEmail1" aria-describedby="emailHelp">
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" v-model="signUpData.password" class="form-control" id="exampleInputPassword1">
                        </div>
<!--                        <div class="form-group form-check">-->
<!--                            <input type="checkbox" class="form-check-input" id="exampleCheck1">-->
<!--                            <label class="form-check-label" for="exampleCheck1">Check me out</label>-->
<!--                        </div>-->
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div class="col-6">
                    <h4 class="mb-5">Sign In</h4>
                    <form @submit.prevent="signIn">
                        <div class="form-group">
                            <label for="exampleInputEmail11">Email address</label>
                            <input type="email" class="form-control" v-model="signInData.email" id="exampleInputEmail11" aria-describedby="emailHelp">
                            <small id="emailHelp1" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword11">Password</label>
                            <input type="password" v-model="signInData.password" class="form-control" id="exampleInputPassword11">
                        </div>
                        <!--                        <div class="form-group form-check">-->
                        <!--                            <input type="checkbox" class="form-check-input" id="exampleCheck1">-->
                        <!--                            <label class="form-check-label" for="exampleCheck1">Check me out</label>-->
                        <!--                        </div>-->
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import topNav from "../components/topNav";

export default {
    name: "Auth",
    data(){
        return {
            signInData: {
                email: "",
                password: ""
            },
            signUpData: {
                email: "",
                password: ""
            }
        }
    },
    methods:{
        async signUp(){
            if(this.signUpData.email && this.signUpData.password){
                const {email, password} = this.signUpData;
                let response = await this.$store.dispatch('auth/signUpWithEmailPassword', {email, password});
                if(response.status){
                    return this.$router.push({name: 'Home'})
                }else{
                    alert(response.message)
                }
            }
        },
        async signIn(){
            if(this.signInData.email && this.signInData.password){
                const {email, password} = this.signInData;
                let response = await this.$store.dispatch('auth/signInWithEmailPassword', {email, password});
                if(response.status){
                    return this.$router.push({name: 'Home'})
                }else{
                    alert(response.message)
                }
            }
        }
    },
    components: {
        topNav
    }
}
</script>

<style scoped>

</style>