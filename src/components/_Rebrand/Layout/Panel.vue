<template>
    <div ref="ref-panel" class="panel bg-gray-200" :class="{'bg-gray-900':dark}">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Base from '../Base';

@Component
export default class Panel extends Vue {

    @Prop({ default: false }) public dark!: boolean;

    public mounted(): void {
        //
    }

}
</script>

<style scoped lang="scss">
  
</style>
