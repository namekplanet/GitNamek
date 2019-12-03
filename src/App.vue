<template>
    <div id="app" class="absolute inset-0 overflow-hidden bg-white text-gray-900 text-xs font-bolder subpixel-antialiased">
        <div class="flex h-full">
            <div class="w-18 h-full">
                <SideBar />
            </div>
            <GPanel :dark="true" class="flex-1 bg-gray-200 relative">
                <div>
                    <MainBar/>
                </div>
                <div class="absolute inset-0" style="top:40px;">
                    <router-view/>
                </div>
            </GPanel>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { app } from 'electron';

@Component
export default class App extends Vue {

    public mounted(): void {
        //
    }

}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
:focus {outline:none;}
</style>
