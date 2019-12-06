<template>
    <div id="app" class="absolute inset-0 overflow-hidden bg-white text-gray-900 text-xs font-bolder subpixel-antialiased" :data-theme="isDark?'dark':'light'">
        <div class="flex flex-col h-full">
            <GTitleBar title="GitNamek Application"></GTitleBar>
            <router-view/>
        </div>
        <!-- <div class="flex h-full">
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
        </div> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { app } from 'electron';

@Component
export default class App extends Vue {

    public isOpenedLeft: boolean = false;
    public isOpenedRight: boolean = false;
    public isDark: boolean = false;

    public mounted(): void {
        //
    }

    public open() {
        this.isOpenedLeft = !this.isOpenedLeft;
    }

}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--main-color);
    background-color: var(--background-color);
}
:focus {outline:none;}
</style>
