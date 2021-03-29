import config from '../config'
export default {
    created () {      
        const isUserLoggedIn = this.$store.state.loggedIn  
        if (isUserLoggedIn) {
          const clubId = this.$store.state.club.club_id
            config.getData('/club/detail/' + clubId)
            .then(response => {
                if (response.status_code) {
                  this.$store.commit('addClub', response.data)
                }
            })
        }
    },
    methods: {

    }
}