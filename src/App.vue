<template>
    <div id="app" class="absolute inset-0 overflow-hidden bg-gray-900 text-gray-500 text-sm font-bolder">
        <div>
            <MainBar/>
        </div>
        <div class="absolute inset-0" style="top:40px;">
            <router-view/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
:focus {outline:none;}
</style>
