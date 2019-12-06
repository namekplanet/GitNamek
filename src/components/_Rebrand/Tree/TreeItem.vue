<template>
    <li>
        <span>{{ title }}</span>
        <slot class="ml-3"></slot>
    </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {

    @Prop({default: ''}) public readonly title!: string;

    public mounted(): void {
        //
    }

    public onClick(): void {
        this.$emit('click');
    }

}
</script>

<style scoped lang="scss">
</style>
