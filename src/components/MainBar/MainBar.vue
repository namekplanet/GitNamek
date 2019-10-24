<template>
    <div class="flex bg-gray-700 h-10">
        <div class="flex-1 h-full">
            <div class="flex content-center flex-wrap h-full">
                <div class="flex-1">
                    <ul class="ml-5">
                        <li class="float-left">
                            <router-link to="/">
                                <div class="p-1 px-4 border border-gray-500 text-white bolder rounded-l"
                                    :class="{'bg-gray-500': getSelectedMenuIndex===0}"
                                    @click="$store.state.menuIndex=0">
                                    <span>Home</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="float-left" v-if="$store.state.openedProject">
                            <router-link to="/project">
                                <div class="p-1 px-4 border border-gray-500 text-white bolder rounded-r"
                                    :class="{'bg-gray-500': getSelectedMenuIndex===1}"
                                    @click="$store.state.menuIndex=1">
                                    <span>Project</span>
                                </div>
                            </router-link>
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

    get getSelectedMenuIndex(): number {
        return this.$store.state.menuIndex;
    }
}
</script>

<style scoped lang="scss">
</style>
