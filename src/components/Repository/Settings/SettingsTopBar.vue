<template>
    <div v-if="selectedProject" class="float-right">
        <ul>
            <li class="float-left mr-1">
                <Button color="info"
                    @click="showRepository()"
                >Close</Button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/models';

@Component
export default class SettingsTopBar extends Vue {

    get selectedProject(): Project {
        return this.$store.state.openedProject;
    }

    public mounted(): void {
        //
    }

    public showRepository(): void {
        this.$router.push('/project');
    }

}
</script>

<style scoped lang="scss">
</style>
