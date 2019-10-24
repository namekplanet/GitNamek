<template>
    <li @click="onClick">
        <a href="#" class="px-4 py-2 block text-black hover:bg-gray-400 whitespace-no-wrap">{{ label }}</a>
    </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DropdownItem extends Vue {

    @Prop({ default: '' }) public readonly label!: string;

    @Prop({ default: '' }) public readonly value!: string;

    public onClick(): void {
        this.$parent.$emit('click', this.value ? this.value : this.label);
    }
}
</script>
