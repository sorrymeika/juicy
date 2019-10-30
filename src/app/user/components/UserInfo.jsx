import React from 'react';
import { inject } from 'snowball/app';
import { SfsImage } from 'sn-app';

function UserInfo({ userInfo }) {
    return (
        <div className="uc_userinfo flex">
            <div className="uc_userinfo_avatars">
                <SfsImage src={userInfo.avatars} className="avatars" />
            </div>
            <div className="uc_userinfo_nickName">
                {userInfo.nickName || userInfo.userName}
            </div>
        </div>
    );
}

export default inject(({ userCenterService }) => {
    return userCenterService
        ? {
            userInfo: userCenterService.userInfo
        }
        : null;
})(UserInfo);