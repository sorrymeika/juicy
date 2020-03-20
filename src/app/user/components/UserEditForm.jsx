import React from 'react';
import { inject, autowired } from 'snowball/app';
import { ImageUpload } from 'snowball/components';
import { SfsImage, CheckBox } from 'sn-app';

function UserEditForm({ userInfo, onFieldChange }) {
    return (
        <div>
            <ImageUpload
                className="ue_avatars_upload"
            >
                <button>
                    <SfsImage
                        className="avatars"
                        src={userInfo.avatars}
                    />
                    <p className="cl_999">点击上传头像</p>
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
                <div className="app_form_input flex">
                    <div
                        className="flex"
                        onClick={() => onFieldChange('gender', 1)}
                    >
                        <CheckBox checked={userInfo.gender === 1}></CheckBox>
                        <div className="ml_s">男</div>
                    </div>
                    <div
                        className="flex ml_l"
                        onClick={() => onFieldChange('gender', 0)}
                    >
                        <CheckBox checked={userInfo.gender === 0}></CheckBox>
                        <div className="ml_s">女</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default inject(() => {
    const userEditViewModel = autowired('userEditViewModel');
    return {
        userInfo: userEditViewModel.userInfo,
        onFieldChange: (name, value) => userEditViewModel.onFieldChange({ [name]: value })
    };
})(UserEditForm);