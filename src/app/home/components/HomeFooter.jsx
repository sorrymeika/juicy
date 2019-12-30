import React from "react";
import { inject } from "snowball/app";

function HomeFooter({ currentTab, onFooterTabChange }) {
    const tabs = [{
        icon: 'icon-home',
        key: 'home',
        text: '首页'
    }, {
        icon: 'icon-cate',
        key: 'cate',
        text: '分类'
    }, {
        icon: 'icon-find',
        key: 'find',
        text: '发现'
    }, {
        icon: 'icon-cart',
        key: 'cart',
        text: '购物车'
    }, {
        icon: 'icon-user',
        key: 'user',
        text: '我的'
    }];

    return (
        <footer className="ho_footer bd_t flex">
            {
                tabs.map((tab) => {
                    return (
                        <button
                            key={tab.key}
                            className={"ho_footer_btn fx_1" + (tab.key == currentTab ? ' curr' : '')}
                            onClick={() => onFooterTabChange({ type: tab.key })}
                        >
                            <i className={"iconfont " + tab.icon}></i>
                            <span>{tab.text}</span>
                        </button>
                    );
                })
            }
        </footer>
    );
}

export default inject(({ onFooterTabChange, currentTab }) => {
    return {
        currentTab,
        onFooterTabChange
    };
})(HomeFooter);