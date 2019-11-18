import React from 'react';
import { Header, MainScrollView } from 'snowball/components';
import UserInfo from '../components/UserInfo';
import MyOrder from '../components/MyOrder';
import { inject } from 'snowball/app';

function UserCenter({ visible, showBack, onToSetting }) {
    return (
        <div style={{ display: visible ? 'block' : 'none' }}>
            <Header
                back={showBack !== false}
                className="uc_header"
                buttons={
                    <>
                        <button
                            className="iconfont icon-setting"
                            onClick={onToSetting}
                        ></button>
                        <button className="iconfont icon-message"></button>
                    </>
                }
            ></Header>
            <MainScrollView>
                <UserInfo></UserInfo>
                <MyOrder></MyOrder>
            </MainScrollView>
        </div>
    );
}

export default inject(({ userCenterService }) => {
    return {
        onToSetting: userCenterService.onToSetting.emit
    };
})(UserCenter);