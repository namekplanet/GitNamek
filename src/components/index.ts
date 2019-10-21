import Vue from 'vue';

import TerminalInput from '@/components/Terminal/TerminalInput.vue';
import RepositorySideBar from '@/components/Repository/RepositorySideBar.vue';
import RepositoryFilesStage from '@/components/Repository/RepositoryFilesStage.vue';
import RepositoryTopBar from '@/components/Repository/RepositoryTopBar.vue';
import RepositoryTreeCommit from '@/components/Repository/RepositoryTreeCommit.vue';


Vue.component('TerminalInput', TerminalInput);
Vue.component('RepositorySideBar', RepositorySideBar);
Vue.component('RepositoryFilesStage', RepositoryFilesStage);
Vue.component('RepositoryTopBar', RepositoryTopBar);
Vue.component('RepositoryTreeCommit', RepositoryTreeCommit);
