<template>
    <div class="absolute inset-0">
        <div class="relative h-full">
            <div class="absolute mb-12 inset-0">
                <div class="flex h-full">
                    <div class="w-64 h-full">
                        <div v-if="$store.state.openedProject" class="h-full">
                            <RepositorySideBar/>
                        </div>
                    </div>
                    <div class="flex-1" v-show="!toggleFullSidebar">
                        <div v-if="$store.state.openedFile" class="h-full">
                            <FileEditor/>
                        </div>
                        <div v-else class="h-full overflow-y-scroll px-1">
                            <RepositoryTreeCommit/>
                        </div>
                    </div>
                    <div style="min-width:400px;" :class="{'w-full': toggleFullSidebar}">
                        <div class="flex h-full">
                            <div class="bg-gray-300 h-full p-1 cursor-pointer rounded"
                                @click="toggleFullSidebar=!toggleFullSidebar">
                                    {{ toggleFullSidebar ? '>' : '<'}}
                                </div>
                            <div v-if="$store.state.openedProject" class="h-full w-full">
                                <RepositoryFilesStage/>
                            </div>
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
export default class Project extends Vue {

    public toggleFullSidebar: boolean = false;

    public mounted(): void {
        if (!this.$store.state.openedProject) {
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss">
</style>
