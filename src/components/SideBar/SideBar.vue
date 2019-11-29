<template>
    <div class="flex flex-col align-top h-full">
        <div class="w-full">
            <div class="m-1 rounded hover:bg-gray-200">
                <router-link to="/">
                    <div class="px-1 py-2 text-center">
                        <div>
                            <i class="fas fa-home text-gray-600 text-lg"></i>
                        </div>
                        <div>
                            <span class="bolder">Home</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="w-full">
            <div class="m-1 rounded hover:bg-gray-200">
                <router-link to="/project" >
                    <div class="px-1 py-2 text-center">
                        <div>
                            <i class="fas fa-box text-gray-600 text-lg"></i>
                        </div>
                        <div>
                            <span class="bolder">Project</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="w-full">
            <div class="m-1 rounded hover:bg-gray-200">
                <router-link to="/settings">
                    <div class="px-1 py-2 text-center">
                        <div>
                            <i class="fas fa-cog text-gray-600 text-lg"></i>
                        </div>
                        <div>
                            <span class="bolder">Settings</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="w-full">
            <div class="m-1 rounded hover:bg-gray-200">
                <router-link to="/styles">
                    <div class="px-1 py-2 text-center">
                        <div>
                            <i class="fas fa-cog text-gray-600 text-lg"></i>
                        </div>
                        <div>
                            <span class="bolder">Styles</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SideBar extends Vue {

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
