import React from 'react';
import { Header } from 'snowball/components';
import { inject, autowired } from 'snowball/app';

function ItemHeader({
    visible,
    currentTab,
    onTabChange
}) {
    return (
        <Header
            className={"app-header-transparent it_header" + (visible ? ' show' : '')}
            buttons={
                <>
                    <button className="iconfont icon-share"></button>
                </>
            }
        >
            <ul className="it_header_tabs flex">
                <li
                    className={currentTab == 'basic' ? " curr" : ''}
                    onClick={() => onTabChange('basic')}
                >商品</li>
                <li
                    className={currentTab == 'detail' ? " curr" : ''}
                    onClick={() => onTabChange('detail')}
                >详情</li>
                <li
                    className={currentTab == 'comment' ? " curr" : ''}
                    onClick={() => onTabChange('comment')}
                >评价</li>
                <li className={"cursor cursor_" + currentTab}></li>
            </ul>
        </Header>
    );
}

export default inject(() => {
    const itemScrollHandler = autowired('itemScrollHandler');
    return {
        visible: itemScrollHandler.headerVisible,
        currentTab: itemScrollHandler.scrollPos,
        onTabChange(name) {
            itemScrollHandler.scrollToComponent(name);
        }
    };
})(ItemHeader);