<template>
    <div class="absolute inset-0">
        <div class="relative h-full">
            <div class="p-2">
                <div>
                    <span>Buttons</span>
                </div>
                <div>
                    <GButton color="primary" class="">Primary</GButton>
                    <GButton color="success" class="ml-2">Success</GButton>
                    <GButton color="info" class="ml-2">Info</GButton>
                    <GButton color="warning" class="ml-2">Warning</GButton>
                    <GButton color="secundary" class="ml-2">Secundary</GButton>
                </div>
            </div>

            <div class="p-2 mt-5">
                <div>
                    <span>Inputs</span>
                </div>
                <div>
                    <GFormInput title="Text" value="Form input with title" message="This is a message in bottom"/>
                    <GFormInput title="Password" value="Form input with title" message="This is a message in bottom" type="password"/>
                    <GFormInput :no-margin="true" title="Title in Placeholder"  titleAsPlaceholder="true"/>
                    <GFormInput :no-margin="true" title="Title in Placeholder"  titleAsPlaceholder="true" :has-error="true"/>
                    <GFormInput title="Textarea" type="textarea" value="Form input with title" message="This is a message in bottom"/>
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
import '@/components/_Rebrand';

@Component
export default class Styles extends Vue {

    public onSelectItem(data: any): void {
        //
    }
}
</script>

<style lang="scss">
</style>
