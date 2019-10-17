<template>
    <div id="app" class="absolute inset-0 overflow-hidden">
        <div class="relative h-full">
            <div class="h-12 p-3 border-b shadow absolute inset-x-0">
                JupiterOne
            </div>
            <div class="absolute mt-12 mb-12 inset-0">
                <div class="flex h-full">
                    <div class="w-64">a</div>
                    <div class="flex-1">v</div>
                    <div class="w-64">d</div>
                </div>
            </div>
            <div class="h-14 p-3 border-b absolute bottom-0 inset-x-0 shadow">
                <CommandInput/>
            </div>
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
</style>
