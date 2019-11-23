<template>
    <div class="absolute inset-0">
        <div class="relative h-full">
            <div class="absolute inset-0">
                <div class="flex h-full">
                    <div class="w-64 h-full">
                        <div class="h-full p-3">
                            <SettingsSideBar />
                        </div>
                    </div>
                    <div class="flex-1 h-full">
                        <div class="h-full p-3">
                            <FileEditor path="/Users/pedroladeira/.gitconfig" :closable="false" :editable="true" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ProjectSettings extends Vue {

    public toggleFullSidebar: boolean = false;

    public mounted(): void {
        //
    }

    public destroyed(): void {
        this.$store.state.mainBarComponent = null;
    }

    public openFile(file: any): void {
        // this.$store.state.openedFile;
    }
}
</script>

<style lang="scss">
</style>
