import "./sass/style.scss";
import "./sprity/sprite.scss";

import { env as mainEnv } from "snowball";
import { createApplication } from "snowball/app";
import { Sfs, appExtentions } from "sn-app";

import * as appEnv from "./env";
import router from "./app/router";
import { AppConfiguration } from "./shared/configuration";

const env = {
    ...mainEnv,
    ...appEnv
};

const app = createApplication({
    projects: appEnv.PROJECTS,
    routes: router,
    configuration: AppConfiguration,
    extend(app) {
        const extentions = appExtentions(app);
        extentions.initDomEventHooks(document.body);

        return {
            env,
            sfs: new Sfs(env.SFS_URL),
        };
    }
}, document.getElementById('root'), (ctx) => {
    console.log('application start!');
});

window.SNOWBALL_MAIN_APP = app;