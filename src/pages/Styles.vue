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

            <div class="p-2 mt-5">
                <div>
                    <span>Dropdown</span>
                </div>
                <div>
                    <Dropdown label="+" @click="onSelectItem">
                        <DropdownItem label="Bla Bla" value="1"></DropdownItem>
                        <DropdownItem label="Bla Bla" value="2"></DropdownItem>
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Styles extends Vue {

    public onSelectItem(data: any): void {
        //
    }
}
</script>

<style lang="scss">
</style>
