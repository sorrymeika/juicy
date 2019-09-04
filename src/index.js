import "./sass/style.scss";

import { env as mainEnv } from "snowball";
import { createApplication } from "snowball/app";
import { Server } from "sn-app";

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
    baseUri: '/auth_server'
});

const marketServer = new Server({
    baseUri: '/market_server'
});

const tradeServer = new Server({
    baseUri: '/trade_server'
});

createApplication({
    projects,
    routes: router,
    extend() {
        return {
            env,
            authServer,
            marketServer,
            tradeServer
        };
    }
}, document.getElementById('root'), () => {
    console.log('application start!');
});
