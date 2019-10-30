import React from 'react';
import { inject } from 'snowball/app';
import { SfsImage } from 'sn-app';

function UserInfoToEdit({ userInfo, onGoToEdit }) {
    return (
        <div
            className="us_to_edit flex"
            onClick={onGoToEdit}
        >
            <div className="us_avatars">
                <SfsImage src={userInfo.avatars} className="avatars" />
            </div>
            <div className="us_nickName">
                {userInfo.nickName || userInfo.userName}
            </div>
            <button>编辑</button>
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