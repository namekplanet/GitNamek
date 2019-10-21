<template>
    <div id="app" class="absolute inset-0 overflow-hidden">
        <div class="relative h-full">
            <div class="h-12 p-3 border-b shadow absolute inset-x-0">
                <div class="flex">
                    <div class="flex-initial">
                        <div v-if="$store.state.openedProject">
                            {{$store.state.openedProject.name}}
                        </div>
                    </div>
                    <div class="flex-1 text-right">
                        <RepositoryTopBar/>
                    </div>
                </div>
            </div>
            <div class="absolute mt-12 mb-12 inset-0">
                <div class="flex h-full">
                    <div class="w-64 h-full">
                        <div v-if="$store.state.openedProject" class="h-full">
                            <RepositorySideBar/>
                        </div>
                    </div>
                    <div class="flex-1">
                    </div>
                    <div class="w-64">
                        <div v-if="$store.state.openedProject" class="h-full">
                            <RepositoryFilesStage/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-14 p-3 border-b absolute bottom-0 inset-x-0 shadow">
                <TerminalInput/>
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
