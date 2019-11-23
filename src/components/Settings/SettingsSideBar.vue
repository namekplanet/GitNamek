<template>
    <div class="h-full">
        <ul>
            <li class="mb-1">
                <div class="bg-gray-300 rounded cursor-pointer p-2">
                    <div class="flex">
                        <div class="flex-1 cursor-pointer"
                            @click="openRepositorySettings()">
                            <span class="font-bold text-gray-800">Global Configs</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/models';

@Component
export default class SettingsSideBar extends Vue {

    get selectedProject(): Project {
        return this.$store.state.openedProject;
    }

    public mounted(): void {
        //
    }

    public openRepositorySettings(): void {
        //
    }
}
</script>

<style scoped lang="scss">
</style>
