<template>
    <GPanel :dark="true" class="absolute inset-0">
        <div class="relative h-full overflow-y-scroll pb-6">
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

            <div class="p-2 mt-5">
                <div>
                    <span>Panel</span>
                </div>
                <div>
                    Panel Dark
                    <GPanel :dark="true" class="p-3">
                        <GFormInput title="Text" value="Form input with title" message="This is a message in bottom"/>
                    </GPanel>
                    <div class="mt-4">
                        Panel Light
                    </div>
                    <GPanel class="p-3">
                        <GFormInput title="Text" value="Form input with title" message="This is a message in bottom"/>
                    </GPanel>
                </div>
            </div>

            <div class="p-2 mt-5">
                <div>
                    <span>Cards</span>
                </div>
                <div>
                    Card Default
                    <GCard title="This is Card">
                        <GFormInput title="Text" value="Form input with title" message="This is a message in bottom"/>
                        <div slot="footer">
                            This is a simple message
                        </div>
                    </GCard>
                </div>
            </div>

            <div class="p-2 mt-5">
                <div>
                    <span>List</span>
                </div>
                <div>
                    <GCard title="List">
                        <GList title="List title">
                            <GListOption>Option One</GListOption>
                            <GListOption>Option Two</GListOption>
                            <GListOption>Option Three</GListOption>
                            <GListOption>Option Four</GListOption>
                        </GList>
                    </GCard>
                </div>
            </div>
        </div>
    </GPanel>
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
