<template>
    <div class="relative group">
        <div class="flex items-center cursor-pointer py-1">
            <button class="border border-gray-800 w-6 h-6 text-gray-800 font-bold shadow rounded"
                :class="{'bg-gray-300':isVisible}"
                @click="toggleDropdown()">
                <span>{{ label }}</span>
            </button>
        </div>
        <div @click="onClick" v-if="isVisible" class="items-center absolute border border-t-0 bg-gray-300">
            <ul class="list-reset">
                <slot/>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Dropdown extends Vue {

    @Prop({ default: '' }) public readonly label!: string;
    private isVisible: boolean = false;

    public onClick(value: any): void {
        this.isVisible = false;
    }

    public toggleDropdown(): void {
        this.isVisible = !this.isVisible;
    }
}
</script>
