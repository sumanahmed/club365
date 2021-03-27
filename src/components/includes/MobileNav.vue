<template>
    <div>
        <div class="mobile-header-login-wrapper" id="header-sticky">

            <div class="mobile-header">
                <router-link to="/"><img :src="'./assets/img/logo.jpg'" alt="mobile logo"></router-link>
                <span v-if="mobileNav.icon" @click="mobileNavToggle(0)" id="three-dot" class="fa fa-bars"></span>
                <span v-if="!mobileNav.icon" @click="mobileNavToggle(1)" id="three-dot" class="fa fa-times"></span>
            </div>

            <!-- Mobile Profile section -->
            <div v-if="getUser" class="profile_section_mobile">
                <div class="single-profile-mobile">
                    <div class="avater-image-mobile">
                        <p>{{ getUser.user_name.substring(0,1) | capitalizeFirstLetter }}</p>
                    </div>
                    <div class="welcome-text-coin-mobile">
                        <p class="text-block m-0"><b>Welcome</b> : {{ getUser.user_name }} </p>
                        <i class="fa fa-bitcoin"></i> <b class="text-black">{{ getTotalAmount }}</b>
                    </div>
                </div>                    
            </div>

        </div>
        <!-- Mobile Menu -->
        <div class="mobile-menu-wrapper" v-if="mobileNav.menu">                    
            <div class="menu_section">
                <nav class="navigation">
                    <ul class="mainmenu">
                        <li><router-link to="/"><i class="fa fa-home" aria-hidden="true"></i> Home</router-link></li>
                        <li v-if="isLoggedUser"><a style="color: #fff;"><i class="fa fa-user" aria-hidden="true"></i> Profile <i style="float: right;" class="fa fa-angle-down fa-sm " aria-hidden="true"></i></a>
                            <ul class="submenu">
                                <li><router-link to="/club-members">Club Members</router-link></li>
                                <li><router-link to="/change-password">Change Password</router-link></li>
                            </ul>
                        </li>
                        <li v-if="isLoggedUser"><a style="color: #fff;"><i class="fa fa-credit-card" aria-hidden="true"></i> Wallet <i style="float: right;" class="fa fa-angle-down fa-sm " aria-hidden="true"></i> </a>
                            <ul class="submenu">
                                <li><router-link to="/club-income">Club Income</router-link></li>
                                <li><router-link to="/withdraw-request">Withdraw Request</router-link></li>
                                <li><router-link to="/withdraw-details">Withdraw Details</router-link></li>
                            </ul>
                        </li>
                        <li v-if="isLoggedUser"><a href="#" @click.prevent="logout"><i class="fa fa-power-off" aria-hidden="true"></i> Logout</a></li>
                    </ul>
                </nav>
            </div>
        </div>        
    </div>
</template>
<script>
import config from '../../config'
export default {
    name: 'MobileNav',
    data () {
        return {
            errors:[],
            form : {
                username :'',
                password :'',
            }
        }
    },
    computed : {
        isLoggedUser : function () {
            return this.$store.state.loggedIn
        },
        getUser : function () {
            return this.$store.state.commonObj.user
        },
        getTotalAmount : function () {
            return this.$store.state.commonObj.user.totalAmount
        },
        mobileNav : function () {
            return this.$store.state.mobileNav
        }
    },
    methods: {	
        mobileNavToggle (status) {
            if (status != 1) {
                this.$store.dispatch('toggleMobileMenu', status)
            } else {
                this.$store.dispatch('toggleMobileMenu', status)
            }
        },
        signIn() {
            this.$store.state.loader = true
            config.postData('/user/login', this.form)
            .then((response) => {
                if(response.status_code == 200){
                    localStorage.setItem('accessToken', response.access_token);
                    localStorage.setItem('accountType', response.user_type);
                    this.$router.replace('/')
                    this.$router.go()
                    this.$store.state.loader = false
                    this.$store.dispatch('addUserId',  response.user_id)
                    this.$toast.success({
                        title: 'Success',
                        message: 'Loggedin Successfully',
                        type: 'success'
                    })
                }     
            })
            .catch((error) => {
                this.$store.state.loader = false
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors;
                }
            });
        },
        logout(){
            config.postData('/user/logout')
            .then(() => {                
                this.isMobileNavOn = true
                this.isMenuShow = false
                localStorage.removeItem('accessToken');
                this.$store.dispatch('toggleMobileMenu', 1)
                this.$store.dispatch('userLogout', false)
                this.$router.replace('/')
                this.$toast.success({
                    title: 'Success',
                    message: 'Logout Successfully',
                    type: 'success'
                })
            })      
        }
    }
}
</script>

