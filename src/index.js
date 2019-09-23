import "./sass/style.scss";

import { env as mainEnv } from "snowball";
import { createApplication } from "snowball/app";
import { Server, Sfs, appExtentions } from "sn-app";

import * as appEnv from "./env";
import router from "./app/router";

const env = {
    ...mainEnv,
    ...appEnv
};

const projects = {
};

const app = createApplication({
    projects,
    routes: router,
    extend(ctx) {
        const extentions = appExtentions(ctx);
        extentions.initDomEventHooks(document.body);

        return {
            env,
            sfs: new Sfs(env.SFS_URL),
            server: {
                auth: new Server({ baseUrl: '/auth_server' }),
                market: new Server({ baseUrl: '/market_server' }),
                trade: new Server({ baseUrl: '/trade_server' })
            }
        };
    }
}, document.getElementById('root'), (ctx) => {
    console.log('application start!');
});

window.SNOWBALL_MAIN_APP = app;