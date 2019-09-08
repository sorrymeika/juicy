import React from "react";
import { MainScrollView } from "snowball/components";
import { renderBricks } from "../../brick";

function Search() {
    return (
        <div className="app_search flex fx_1">
            <i className="iconfont icon-search"></i>
            <input type="input" className="fx_1" />
        </div>
    );
}

function Home({ pageData, bricks, ctx }) {
    console.log('home', bricks, ctx);
    return (
        <div>
            <header className="app-header">
                <Search></Search>
            </header>
            <MainScrollView>
                {renderBricks(pageData, bricks, ctx)}
            </MainScrollView>
        </div>
    );
}

export default Home;