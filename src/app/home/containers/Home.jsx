import React from "react";
import { MainScrollView } from "snowball/components";

function Search() {
    return (
        <div className="app_search flex fx_1">
            <i className="iconfont icon-search"></i>
            <input type="input" className="fx_1" />
        </div>
    );
}

function Home({ bricks }) {
    console.log('home', bricks);
    return (
        <div>
            <header className="app-header">
                <Search></Search>
            </header>
            <MainScrollView>
                Home
            </MainScrollView>
        </div>
    );
}

export default Home;