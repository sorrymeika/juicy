import React from "react";
import { MainScrollView } from "snowball/components";
import { renderBricks } from "../../brick";
import HomeFooter from "../components/HomeFooter";
import Cart from "../../cart/containers/Cart";
import UserCenter from "../../user/containers/UserCenter";

function Search() {
    return (
        <div className="app_search flex fx_1">
            <i className="iconfont icon-search"></i>
            <input type="input" className="fx_1" />
        </div>
    );
}

function Home({ pageData, bricks, ctx, currentTab, isCartLoaded, isUserLoaded }) {
    return (
        <>
            <HomeFooter />
            <div className="ho_main" style={{ display: currentTab === 'home' ? 'block' : 'none' }}>
                <header className="app-header">
                    <Search></Search>
                </header>
                <MainScrollView>
                    {renderBricks(pageData, bricks, ctx)}
                </MainScrollView>
            </div>
            {
                isCartLoaded && (
                    <Cart
                        visible={currentTab === 'cart'}
                        showBack={false}
                    ></Cart>
                )
            }
            {
                isUserLoaded && (
                    <UserCenter
                        visible={currentTab === 'user'}
                        showBack={false}
                    ></UserCenter>
                )
            }
        </>
    );
}

export default Home;