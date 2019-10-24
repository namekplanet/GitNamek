<template>
    <div class="flex bg-gray-700 h-10">
        <div class="flex-1 h-full">
            <div class="flex content-center flex-wrap h-full">
                <div class="flex-1">
                    <ul class="ml-5">
                        <li class="float-left">
                            <router-link to="/">
                                <div class="p-1 px-4 bg-gray-500 text-white bolder rounded-l">
                                    <span>Home</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="float-left">
                            <router-link to="/project">
                                <div class="p-1 px-4 bg-gray-500 text-white bolder rounded-r">
                                    <span>Project</span>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="flex-1 h-full">
            <div class="flex content-center flex-wrap h-full">
                <div class="flex-1 mr-1">
                    <RepositoryTopBar/>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="bg-gray-800 pt-2 overflow-hidden" style="height: 35px;">

        <div>

        </div>
    </div> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MainBar extends Vue {
}
</script>

<style scoped lang="scss">
</style>
