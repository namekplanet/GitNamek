<template>
    <div class="flex h-10">
        <div class="flex-1 h-full">
            <div class="flex content-center flex-wrap h-full">
                <div class="flex-1">
                    <ul class="ml-3 text-gray-800">
                        <li class="float-left">
                            <router-link to="/">
                                <div class="p-1 px-4 border border-gray-900 bolder rounded-l shadow"
                                    :class="{'bg-blue-800 text-gray-200': getSelectedMenuIndex===0}"
                                    @click="$store.state.menuIndex=0">
                                    <i class="fas fa-home"></i>
                                    <span class="ml-2 font-bold">Home</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="float-left">
                            <router-link to="/project" v-if="$store.state.openedProject">
                                <div class="p-1 px-4 border border-gray-900 bolder rounded-r shadow"
                                    :class="{'bg-blue-800 text-gray-200': getSelectedMenuIndex===1}"
                                    @click="$store.state.menuIndex=1">
                                    <i class="fas fa-toolbox"></i>
                                    <span class="ml-2 font-bold">Project</span>
                                </div>
                            </router-link>
                            <div v-else>
                                <div class="p-1 px-4 border border-gray-500 bolder rounded-r text-gray-500">
                                    <span class="ml-2 font-bold">Project</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="flex-1 h-full" v-if="getSelectedMenuIndex===1">
            <div class="flex content-center flex-wrap h-full">
                <div class="flex-1 mr-1">
                    <RepositoryTopBar/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MainBar extends Vue {

    private isDevelopment: boolean = false;

    get getSelectedMenuIndex(): number {
        return this.$store.state.menuIndex;
    }

    public mounted(): void {
        this.isDevelopment = process.env.NODE_ENV === 'development';
    }
}
</script>

<style scoped lang="scss">
</style>
