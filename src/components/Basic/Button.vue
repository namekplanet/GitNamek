<template>
    <button class="p-1 px-2 rounded border border-gray-900 shadow-md font-bold"
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
        } else if (this.color === 'warning') {
            return this.getWarning();
        } else if (this.color === 'secondary') {
            return this.getSecondary();
        }
        return this.getPrimary();
    }

    public getPrimary(): string {
        return 'bg-blue-800 text-gray-100';
    }

    public getSecondary(): string {
        return 'bg-gray-800 text-gray-100';
    }

    public getSuccess(): string {
        return 'bg-green-800 text-gray-100';
    }

    public getInfo(): string {
        return 'bg-blue-500 text-gray-100';
    }

    public getWarning(): string {
        return 'bg-yellow-600 text-gray-100';
    }

    public onClick(): void {
        this.$emit('click');
    }
}
</script>
