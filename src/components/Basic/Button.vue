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
        }
        return this.getPrimary();
    }

    public getPrimary(): string {
        return 'bg-blue-800 text-gray-100';
    }

    public getSuccess(): string {
        return 'bg-green-800 text-gray-100';
    }

    public onClick(): void {
        this.$emit('click');
    }
}
</script>
