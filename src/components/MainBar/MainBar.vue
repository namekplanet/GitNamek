<template>
    <div class="bg-gray-800 pt-2 overflow-hidden" style="height: 35px;">
        <ul class="ml-5">
            <li class="float-left">
                <router-link to="/">
                    <div class="p-1 px-2 bg-gray-700 rounded-l">
                        <span>Home</span>
                    </div>
                </router-link>
            </li>
            <li class="float-left">
                <router-link to="/project">
                    <div class="p-1 px-2 bg-gray-700 rounded-r">
                        <span>Project</span>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MainBar extends Vue {
}
</script>

<style scoped lang="scss">
</style>
