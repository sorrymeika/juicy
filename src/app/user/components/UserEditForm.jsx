import React from 'react';
import { inject } from 'snowball/app';
import { ImageUpload } from 'snowball/components';
import { SfsImage } from 'sn-app';

function UserEditForm({ userInfo, onFieldChange }) {
    return (
        <div>
            <ImageUpload>
                <button>
                    <SfsImage
                        src={userInfo.avatars}
                    />
                    <p>点击上传头像</p>
                </button>
            </ImageUpload>
            <div className="app_form_item bd_b">
                <div className="app_form_label">昵称</div>
                <div className="app_form_input">
                    <input
                        value={userInfo.nickName}
                        placeholder="输入昵称"
                        onChange={(e) => {
                            onFieldChange("nickName", e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="app_form_item bd_b">
                <div className="app_form_label">会员名</div>
                <div className="app_form_input">
                    {userInfo.userName}
                </div>
            </div>
            <div className="app_form_item">
                <div className="app_form_label">性别</div>
                <div className="app_form_input">
                    {userInfo.gender}
                </div>
                <i className="iconfont icon-arrow-right"></i>
            </div>
        </div>
    );
}

export default inject(({ userEditService }) => {
    return userEditService
        ? {
            userInfo: userEditService.userInfo
        }
        : null;
})(UserEditForm);