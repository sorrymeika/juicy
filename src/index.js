import "./sass/style.scss";

import { env as mainEnv } from "snowball";
import { createApplication } from "snowball/app";
import { Server, Sfs } from "sn-app";

import * as appEnv from "./env";
import router from "./app/router";

const env = {
    ...mainEnv,
    ...appEnv
};

window.SNOWBALL_MAIN_APP = {
    env
};

const projects = {
};

const authServer = new Server({
    baseUrl: '/auth_server'
});

const marketServer = new Server({
    baseUrl: '/market_server'
});

const tradeServer = new Server({
    baseUrl: '/trade_server'
});

createApplication({
    projects,
    routes: router,
    extend() {
        return {
            env,
            sfs: new Sfs(env.SFS_URL),
            server: {
                auth: authServer,
                market: marketServer,
                trade: tradeServer,
            }
        };
    }
}, document.getElementById('root'), () => {
    console.log('application start!');
});
