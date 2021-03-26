<template>
    <div>
        <div class="club-login-wraper fadeInUp">
            <h3 class="text-center">CLUB LOGIN</h3>
            <form class="cmn-form login-form" action="" method="POST">
                <input type="hidden" name="_token" value="">
                <div class="form-group">
                    <div class="input-group input-group-icon">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <span class="fa fa-user-o" aria-hidden="true"></span>
                            </div>
                        </div>
                        <input v-model="form.username" autofocus="" type="text" class="form-control" name="username" placeholder="Username" value="">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group input-group-icon">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <span class="fa fa-lock" aria-hidden="true"></span>
                            </div>
                        </div>
                        <input v-model="form.password" type="password" class="form-control" name="password" placeholder="Password" value="">
                        <span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>  
                    </div>
                </div>
                <div class="form-group">
                    <button @click.prevent="signIn" style="margin-left:90px" class="btn btn-sm btn-secondary text-center submit-btn" type="submit">CLUB SIGN IN</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import config from '../../config'
export default {
    name:'LeftSidebar',
    data () {
        return {
            errors:[],
            form : {
                username :'',
                password :'',
            }
        }
    },
    methods: {
        signIn() {
            this.$store.state.loader = true
            config.postData('/club/login', this.form)
            .then((response) => {
                if(response.status_code == 200){
                    localStorage.setItem('accessToken', response.access_token);
                    localStorage.setItem('accountType', response.user_type);
                    this.$store.state.loader = false
                    this.$store.dispatch('addClub',  response.club)
                    this.$router.replace('/')
                   // this.$router.go()
                    this.$toast.success({
                        title: 'Success',
                        message: 'Loggedin Successfully',
                        type: 'success'
                    })
                }     
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors;
                }
            });
        }
    }
}
</script>
<style scoped>
    body{
        background: #2c4841;
        color: #fff;
    }
    h3{
        color: #fff;
    }
    .club-login-wraper {
        width: 300px;
        margin: 0 auto;
        margin-top: 200px;
    }
</style>