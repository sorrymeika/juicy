import "./sass/style.scss";
import "./sprity/sprite.scss";

import { env as mainEnv } from "snowball";
import { createApplication } from "snowball/app";
import { Server, Sfs, appExtentions } from "sn-app";

import * as appEnv from "./env";
import router from "./app/router";
import { AppConfiguration } from "./AppConfiguration";

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
            server: {
                user: new Server({ baseUrl: env.API_URL + '/user_server', app }),
                market: new Server({ baseUrl: env.API_URL + '/market_server', app }),
                trade: new Server({ baseUrl: env.API_URL + '/trade_server', app }),
                base: new Server({ baseUrl: env.API_URL + '/base_server', app }),
            }
        };
    }
}, document.getElementById('root'), (ctx) => {
    console.log('application start!');
});

window.SNOWBALL_MAIN_APP = app;