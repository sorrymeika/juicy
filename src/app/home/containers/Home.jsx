import React from "react";
import { MainScrollView } from "snowball/components";
import { renderBricks } from "../../brick";
import HomeFooter from "../components/HomeFooter";
import Cart from "../../cart/containers/Cart";
import UserCenter from "../../user/containers/UserCenter";
import Category from "../../category/containers/Category";

function Home({
    ctx,
    pageData,
    bricks,
    currentTab,
    isCartLoaded,
    isCateLoaded,
    isUserLoaded,
    onGotoSearch
}) {
    return (
        <>
            <HomeFooter />
            <div className="ho_main" style={{ display: currentTab === 'home' ? 'block' : 'none' }}>
                <header className="app-header ho_header flex">
                    <button
                        className="app_search flex fx_1"
                        onClick={onGotoSearch}
                    >
                        <i className="iconfont icon-search"></i>
                    </button>
                </header>
                <MainScrollView>
                    {renderBricks(pageData, bricks, ctx)}
                    <div className="pd_m ta_c fs_m cl_333">
                        <a href="http://www.beian.miit.gov.cn/">沪ICP备19040998号-1</a>
                    </div>
                </MainScrollView>
            </div>

            {
                isCateLoaded && (
                    <Category
                        visible={currentTab === 'cate'}
                        showBack={false}
                    ></Category>
                )
            }
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