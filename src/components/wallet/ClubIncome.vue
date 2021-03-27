<template>
    <div>
        <div class="page-title-custom">
            <p> <b> Home </b> <i class="fa fa-angle-right"></i> <span class="text-warning"> deposit details </span></p>
        </div>
        <div class="profile-wrapper">
            <table id="example" class="text-center table table-sm table-responsive-lg table-responsive-md table-responsive-sm table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>Clug Get</th>
                        <th>Username</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(income, index) in incomes.data" :key="index">
                        <td>{{ income.clubGet }}</td>
                        <td>{{ income.username }}</td>
                        <td>
                            {{ income.created_at | dateformat }} at {{ income.created_at | timeformat }}                                                                 
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="mt-3">
                <pagiantion :data="incomes" @pagination-change-page="getResults">
                    <span slot="prev-nav">&lt;</span>
                    <span slot="next-nav">&gt;</span>
                </pagiantion>
            </div>   
        </div>    
    </div>
</template>
<script>
import config from '../../config'
import pagiantion from 'laravel-vue-pagination'
export default {
    name:'ClubIncome',
    components:{
        pagiantion:pagiantion
    },
    data () {
        return {
            incomes: {
                data: []
            },
            userId: this.$store.state.club.club_id
        }
    },
    created () {
        this.$store.dispatch('toggleMobileMenu', 1)
        this.getDepositDetails()
        this.getResults()
    },
    methods: {        
        getDepositDetails () {
            this.$store.state.loader = true
            config.getData('/club/income/history/'+ this.userId)
            .then((response) => {
                this.$store.state.loader = false
                this.incomes = response.data
            })
            .catch((error) => {
                console.log('error = ', error)
            });
        },
        getResults(page = 1) {
            config.getData('club/income/history/'+ this.userId +'?page=' + page)
            .then(response => {
                if(!response.data) {
                    this.$store.state.loader = true
                } else {
                    this.$store.state.loader = false
                    this.incomes = response.data 
                }
            });
        }
    }
}
</script>