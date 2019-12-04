// @ts-ignore
const Git: any = require('simple-git/promise');

export default class Repository {

    public remoteURL: string = '';
    public repoPath: string;
    public remotes: string[] = [];
    public branchLocal: any[] = [];
    public branchRemote: any[] = [];
    public tags: any[] = [];
    public branchRemoteCurrent?: string;
    public branchRemoteTracking?: string;
    public stagedFiles: any[] = [];
    public unstagedFiles: any[] = [];
    public commitsAhead: number = 0;
    public logs: any[] = [];
    public logsGraph: any[] = [];
    private isOpened: boolean = false;
    private repo: any;


    constructor(repoPath: string) {
        this.repoPath = repoPath;
    }

    public async openRepository(path: string): Promise<boolean> {
        return new Promise<boolean>((resolve: any, reject: any) => {
            Git(path).checkIsRepo().then((data: any) => {
                this.isOpened = true;
                this.refresh();
                resolve(true);
            });
        });
    }

    public refresh(): void {
        this.loadBranches();
        this.loadTags();
        this.loadStatus();
        this.loadRemotes();
        this.loadLogs();
    }

    public loadBranches(): void {
        // get local branches
        const request: any = async (msg: string) => {
            return await Git(this.repoPath).branch([]);
        };
        request().then((data: any) => {
            this.branchLocal.splice(0, this.branchLocal.length);
            data.all.forEach((name: string) => {
                this.branchLocal.push(data.branches[name]);
            });
        });

        // get remote branches
        const requestRem: any = async (msg: string) => {
            return await Git(this.repoPath).branch(['--remotes']);
        };
        requestRem().then((data: any) => {
            this.branchRemote.splice(0, this.branchRemote.length);
            data.all.forEach((name: string) => {
                this.branchRemote.push(data.branches[name]);
            });
        });
    }

    public loadTags(): void {
        const request: any = async (msg: string) => {
            return await Git(this.repoPath).tags([]);
        };
        request().then((data: any) => {
            this.tags.splice(0, this.tags.length);
            data.all.forEach((name: string) => {
                this.tags.push(name);
            });
        });
    }

    public loadRemotes(): void {
        const request: any = async (msg: string) => {
            return await Git(this.repoPath).getRemotes(true);
        };
        request().then((data: any) => {
            data.forEach((r: any) => this.remotes.push(r.name));
        });
    }

    public loadStatus(): void {
        Git(this.repoPath).status((err: any, data: any) => {
            this.stagedFiles.splice(0, this.stagedFiles.length);
            this.unstagedFiles.splice(0, this.unstagedFiles.length);
            this.commitsAhead = data.ahead;
            this.branchRemoteCurrent = data.current;
            this.branchRemoteTracking = data.tracking;
            data.files.forEach((file: any) => {
                if (file.index !== ' ' && file.index !== '?') {
                    this.stagedFiles.push({
                        status: file.index,
                        path: file.path,
                    });
                } else {
                    this.unstagedFiles.push({
                        status: file.working_dir,
                        path: file.path,
                    });
                }
            });
        });
        const request: any = async () => {
            return await Git(this.repoPath).listRemote(['--get-url']);
        };
        request().then((data: any) => {
            this.remoteURL = data;
        });
    }

    public stageFile(file: any): void {
        Git(this.repoPath).add(file.path, (data: any) => {
            this.loadStatus();
        });
    }

    public stageAll(): void {
        const listUnstagePaths: string[] = this.unstagedFiles.map((f: any) => f.path);
        Git(this.repoPath).add(listUnstagePaths, (data: any) => {
            this.loadStatus();
        });
    }

    public unstageFile(file: any): void {
        this._raw(['reset', file.path]).then((data: any) => {
            this.loadStatus();
        });
    }

    public unstageAll(): void {
        const listStagePaths: string[] = this.stagedFiles.map((f: any) => f.path);
        listStagePaths.unshift('reset');
        this._raw(listStagePaths).then((data: any) => {
            this.loadStatus();
        });
    }

    public commit(message: string): void {
        const request: any = async (msg: string) => {
            return await Git(this.repoPath).commit(msg);
        };
        request(message).then((data: any) => {
            this.refresh();
        });
    }

    public push(): void {
        this._raw(['config', 'credential.helper']).then((data: any) => {
            // console.log('data:', data);
            //
        });
        return;
        // if (this.branchRemoteTracking) {
        //     const rpb = this.branchRemoteTracking.split('/');
        //     const request: any = async (remote: string, branch: string) => {
        //         return await Git(this.repoPath).push([remote, branch]);
        //     };
        //     request(rpb[0], rpb[1]).then((data: any) => {
        //         this.refresh();
        //     });
        // }
    }

    public pull(): void {
        Git(this.repoPath).pull(null, null, (data: any) => {
            this.refresh();
        });
    }

    public loadLogs(): void {
        const options = {
            format: {
                hash: '%h',
                date: '%ai',
                message: '%s',
                refs: '%D',
                body: '%B',
                author_name: '%aN',
                author_email: '%ae',
                parent: '%p',
            },
        };
        Git(this.repoPath).log(options).then((data: any) => {
            this.logs.splice(0, this.logs.length);
            data.all.forEach((l: any) => {
                l.parents = l.parent.split(' ');
                this.logs.push(l);
            });
        });
    }

    public createLocalBranch(name: string): void {
        const request: any = async (bname: string) => {
            return await Git(this.repoPath).raw(['branch', bname]);
        };
        request(name).then((data: any) => {
            this.refresh();
        });
    }

    public selectLocalBranch(branchName: string): void {
        const request: any = async (bname: string) => {
            return await Git(this.repoPath).checkoutLocalBranch(bname);
        };
        request(branchName).then((data: any) => {
            this.refresh();
        });
    }

    private async _raw(data: any) {
        return await Git(this.repoPath).raw(data);
    }
}
