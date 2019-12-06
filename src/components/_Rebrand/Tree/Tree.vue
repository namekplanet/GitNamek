<template>
    <ul>
        <slot></slot>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {

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
