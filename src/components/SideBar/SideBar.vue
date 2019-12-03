<template>
    <GPanel :dark="true" class="flex flex-col align-top h-full border-r border-gray-800">
        <div v-for="(m,i) in menus" :key="i" class="m-2" @click="selectedMenu=i">
            <router-link :to="m.link">
                <div class="px-2 py-2 text-center rounded-sm hover:bg-gray-700" :class="{'bg-gray-800' : selectedMenu==i}">
                    <i class="text-gray-600 text-lg" :class="m.icon"></i>
                </div>
            </router-link>
        </div>
    </GPanel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SideBar extends Vue {

    private selectedMenu: number = -1;
    private isDevelopment: boolean = false;
    private menus: any[] = [
        { link: '/', icon: 'fas fa-home'},
        { link: '/project', icon: 'fas fa-box'},
        { link: '/settings', icon: 'fas fa-cog'},
        { link: '/styles', icon: 'fas fa-palette'},
    ];

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
