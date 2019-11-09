import Vue from 'vue';

// basics
import Button from '@/components/Basic/Button.vue';
import Dropdown from '@/components/Basic/Dropdown.vue';
import DropdownItem from '@/components/Basic/DropdownItem.vue';
import Loader from '@/components/Basic/Loader.vue';

// components
import MainBar from '@/components/MainBar/MainBar.vue';
import RepositorySideBar from '@/components/Repository/RepositorySideBar.vue';
import RepositoryFilesStage from '@/components/Repository/RepositoryFilesStage.vue';
import RepositoryTopBar from '@/components/Repository/RepositoryTopBar.vue';
import RepositoryTreeCommit from '@/components/Repository/RepositoryTreeCommit.vue';
import RepositoryClone from '@/components/Repository/RepositoryClone.vue';
import FileEditor from '@/components/Editors/FileEditor.vue';


Vue.component('Button', Button);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Loader', Loader);

Vue.component('MainBar', MainBar);
Vue.component('RepositorySideBar', RepositorySideBar);
Vue.component('RepositoryFilesStage', RepositoryFilesStage);
Vue.component('RepositoryTopBar', RepositoryTopBar);
Vue.component('RepositoryTreeCommit', RepositoryTreeCommit);
Vue.component('RepositoryClone', RepositoryClone);
Vue.component('FileEditor', FileEditor);
