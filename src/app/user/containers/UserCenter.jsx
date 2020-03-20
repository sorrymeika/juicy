import React from 'react';
import { inject, mapViewModelToProps } from 'snowball/app';
import { Header, MainScrollView } from 'snowball/components';
import UserInfo from '../components/UserInfo';
import MyOrder from '../components/MyOrder';

function UserCenter({ userInfo, visible = true, showBack, onGoToSetting }) {
    return (
        <div className="uc_wrap" style={{ display: visible ? 'block' : 'none' }}>
            <Header
                back={showBack !== false}
                className="uc_header"
                buttons={
                    <>
                        <button
                            className="iconfont icon-setting"
                            onClick={onGoToSetting}
                        ></button>
                        <button className="iconfont icon-message"></button>
                    </>
                }
            ></Header>
            <MainScrollView>
                <UserInfo userInfo={userInfo} />
                <MyOrder />
            </MainScrollView>
        </div>
    );
}

export default inject(mapViewModelToProps('userCenterViewModel'))(UserCenter);