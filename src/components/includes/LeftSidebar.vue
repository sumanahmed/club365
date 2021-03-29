<template>
    <div v-if="!$route.meta.hideNavigation">        
        <div class="left-section scrollCustom" id="style-10">
            <!-- Logo section -->
            <div class="logo_section">
                <router-link to="/"><img :src="'/assets/img/logo.jpg'" alt="dreambet365"/></router-link>
            </div>

            <!-- Profile section -->
            <div v-if="getUser" class="profile_section">
                <div class="single-profile">
                    <div class="avater-image">
                        <p>{{ getUser.club_name.substring(0,1) | capitalizeFirstLetter }}</p>
                    </div>
                    <div class="welcome-text-coin">
                        <p class="text-blck m-0"><b>Welcome</b> : {{ getUser.club_name }} </p>
                        <i class="fa fa-bitcoin"></i> <b class="text-black">{{ getTotalAmount }}</b>
                    </div>
                </div>                    
            </div>

            <!-- Menu section -->
            <div class="menu_section">
                <nav class="navigation">
                    <ul class="mainmenu">
                        <li><router-link to="/"><i class="fa fa-home" aria-hidden="true"></i> Home</router-link></li>
                        <li><router-link to="/join"><i class="fa fa-home" aria-hidden="true"></i> Join</router-link></li>
                        <li><a style="color: #fff;"><i class="fa fa-user" aria-hidden="true"></i> Profile <i style="float: right;" class="fa fa-angle-down fa-sm " aria-hidden="true"></i></a>
                            <ul class="submenu">
                                <li><router-link to="/club-members">Club Members</router-link></li>
                                <li><router-link to="/change-password">Change Password</router-link></li>
                            </ul>
                        </li>
                        <li><a style="color: #fff;"><i class="fa fa-credit-card" aria-hidden="true"></i> Wallet <i style="float: right;" class="fa fa-angle-down fa-sm " aria-hidden="true"></i> </a>
                            <ul class="submenu">
                                <li><router-link to="/club-income">Club Income</router-link></li>
                                <li><router-link to="/withdraw-request">Withdraw Request</router-link></li>
                                <li><router-link to="/withdraw-details">Withdraw Details</router-link></li>
                            </ul>
                        </li>
                        <li><a href="#" @click.prevent="logout"><i class="fa fa-power-off" aria-hidden="true"></i> Logout</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>
<script>
import config from '../../config'
import ClubMixin from '@/mixins/club'
export default {
    name:'LeftSidebar',
    mixins: [ClubMixin],
    data () {
        return {}
    },
    computed : {
        isLoggedUser : function () {
            return this.$store.state.loggedIn
        },
        getUser : function () {
            return this.$store.state.club
        },
        getTotalAmount : function () {
            return this.$store.state.club.totalAmount
        }
    },
    methods: {
        logout(){
            config.postData('/club/logout')
            .then(() => {
                localStorage.removeItem('accessToken');
                this.$store.dispatch('userLogout', false)
                this.$router.replace('/login')
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