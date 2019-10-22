import Vue from 'vue';

// basics
import Button from '@/components/Basic/Button';

// components
import MainBar from '@/components/MainBar/MainBar.vue';
import TerminalInput from '@/components/Terminal/TerminalInput.vue';
import RepositorySideBar from '@/components/Repository/RepositorySideBar.vue';
import RepositoryFilesStage from '@/components/Repository/RepositoryFilesStage.vue';
import RepositoryTopBar from '@/components/Repository/RepositoryTopBar.vue';
import RepositoryTreeCommit from '@/components/Repository/RepositoryTreeCommit.vue';


Vue.component('Button', Button);

Vue.component('MainBar', MainBar);
Vue.component('TerminalInput', TerminalInput);
Vue.component('RepositorySideBar', RepositorySideBar);
Vue.component('RepositoryFilesStage', RepositoryFilesStage);
Vue.component('RepositoryTopBar', RepositoryTopBar);
Vue.component('RepositoryTreeCommit', RepositoryTreeCommit);
