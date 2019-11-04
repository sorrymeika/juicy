import React from 'react';
import { inject } from 'snowball/app';
import { SfsImage } from 'sn-app';

function UserInfoToEdit({ userInfo, onGoToEdit }) {
    return (
        <div className="us_to_edit">
            <div
                className="us_userinfo flex"
                onClick={onGoToEdit}
            >
                <div className="us_avatars">
                    <SfsImage src={userInfo.avatars} className="avatars" />
                </div>
                <div className="us_info fx_1">
                    <p className="us_nickName">
                        {userInfo.nickName || userInfo.userName}
                    </p>
                    <p className="us_name">
                        会员名：{userInfo.nickName || userInfo.userName}
                    </p>
                </div>
                <button className="us_edit_btn">编辑</button>
            </div>
            <div
                className="us_address flex bd_t"
                app-link="/address/list"
            >
                <p className="fx_1">我的收货地址</p>
                <i className="iconfont icon-arrow-right"></i>
            </div>
        </div>
    );
}

export default inject(({ settingService }) => {
    return settingService
        ? {
            userInfo: settingService.userInfo,
            onGoToEdit: settingService.onGoToEdit.emit,
        }
        : null;
})(UserInfoToEdit);