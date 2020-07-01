<template>
    <div class="home">
        <home-header></home-header>
        <div class="home-container">
            <router-view :key="Date.now()" />
        </div>
        <home-footer></home-footer>
    </div>
</template>

<script>
import homeHeader from './components/home-header'
import homeFooter from './components/home-footer'
export default {
    data() {
        return {
        }
    },
    components:{
        homeHeader,
        homeFooter
    },
    created() {
        document.body.style.background=`#e1e4e8`;
    },
}
</script>