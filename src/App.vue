<template>
  <div>
      <div v-if="loader" id="preloader"></div>
      <div class="full-body">
        <div class="main-content">
          <left-sidebar></left-sidebar>  
          <div class="middle-section scrollCustom" id="style-10"> 
              <mobile-nav></mobile-nav>
              <router-view></router-view>
          </div> 
          <right-sidebar></right-sidebar> 
        </div>    
        <footer-nav></footer-nav>
        <a href="#" id="back-to-top"><i class="fa fa-angle-up"></i></a>
    </div>    
    <a href="#" id="back-to-top-mobile"><i class="fa fa-angle-up"></i></a>
  </div>
</template>

<script>
import LeftSidebar from './components/includes/LeftSidebar'
import MobileNav from './components/includes/MobileNav'
import RightSidebar from './components/includes/RightSidebar'
import Footer from './components/includes/Footer'

export default {
  name: 'App',
  components: {
    'mobile-nav': MobileNav,
    'left-sidebar': LeftSidebar,
    'right-sidebar': RightSidebar,
    'footer-nav': Footer,
  },  
  computed : {
    loader : function () {
      return this.$store.state.loader
    },
    loginLoader : function () {
      return this.$store.state.loginLoader
    }
  }
}
</script>
