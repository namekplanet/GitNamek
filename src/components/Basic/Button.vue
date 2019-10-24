<template>
    <button class="p-1 px-2 rounded"
        :class="getStyleClass"
        @click="onClick()">
        <slot/>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {

    @Prop({ default: 'primary' }) public readonly color!: string;

    get getStyleClass(): string {
        if (this.color === 'success') {
            return this.getSuccess();
        } else if (this.color === 'info') {
            return this.getInfo();
        }
        return this.getPrimary();
    }

    public getPrimary(): string {
        return 'bg-blue-800 text-gray-100';
    }

    public getSuccess(): string {
        return 'bg-green-800 text-gray-100';
    }

    public getInfo(): string {
        return 'bg-blue-500 text-gray-100';
    }

    public onClick(): void {
        this.$emit('click');
    }
}
</script>
