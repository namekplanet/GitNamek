<template>
    <div class="absolute inset-0">
        <div class="relative h-full">
            <div class="h-12 p-3 border-b shadow absolute inset-x-0">
                <div class="flex">
                    <div class="flex-initial">
                        <div v-if="$store.state.openedProject">
                            {{$store.state.openedProject.name}}
                        <router-link to="/">Home</router-link>
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
                        <div v-if="$store.state.openedProject" class="h-full">
                            <RepositoryTreeCommit/>
                        </div>
                    </div>
                    <div class="w-64">
                        <div v-if="$store.state.openedProject" class="h-full">
                            <RepositoryFilesStage/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-14 p-3 border-b absolute bottom-0 inset-x-0 shadow">
                Status Bar
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Project extends Vue {}
</script>

<style lang="scss">
</style>
