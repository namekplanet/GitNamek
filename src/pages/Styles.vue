<template>
    <div class="absolute inset-0">
        <div class="relative h-full">
            <div class="p-2">
                <div>
                    <span>Buttons</span>
                </div>
                <div>
                    <Button color="primary" class="">Primary</Button>
                    <Button color="success" class="ml-2">Success</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Styles extends Vue {}
</script>

<style lang="scss">
</style>
