<template>
    <div>
        <slider></slider>
        <div class="page-title-custom">
            <p> <b> Home </b> <i class="fa fa-angle-right"></i> <span class="text-warning"> profile </span></p>
        </div>

        <div class="profile-wrapper">
            <!--<p><b>B</b></p>-->
            <p><i class="fa fa-user-o"></i></p>
            <div class="profile">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td> {{ loggedUser.club_username }} </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{{ loggedUser.email }}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{{ loggedUser.phone }}</td>
                        </tr>
                        <tr>
                            <td> Join Date </td>
                            <td> {{ loggedUser.created_at | dateformat }} </td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td><span v-if="loggedUser.status" class="badge badge-pill badge-success">Active</span> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import Slider from '../dashboard/Slider'
export default {
    name:'Profile',
    components: {
        'slider': Slider
    },
    data () {
        return {
            profile:''
        }
    },
    created () {
        this.$store.dispatch('toggleMobileMenu', 1)
    },
    computed : {
        loggedUser : function () {
            return this.$store.state.club
        }
    }
}
</script>