export default {
    mutateCommonProperties (state, payload) {
        state.commonObj = Object.assign({}, state.commonObj, payload)
    },
    amountUpdate (state, amount) {
        state.club.totalAmount = parseFloat(state.club.totalAmount - amount).toFixed(2)
    },
    addAmount (state, amount) {
        state.club.totalAmount = parseFloat(state.club.totalAmount + amount).toFixed(2)
    },
    userLogout (state, loggedInfalse) {
        state.club = ''
        state.loggedIn = loggedInfalse
    },
    profileUpdate (state, profile) {
        state.commonObj.profile = profile
    },
    addClub (state, club) {
        state.club = club
        state.loggedIn = true
    },
    toggleMobileMenu (state, status) {
        state.mobileNav.icon = status == 0 ? false : true
        state.mobileNav.menu = status != 0 ? false : true
    }
}