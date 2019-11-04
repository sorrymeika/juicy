import React from 'react';
import { Header, MainScrollView } from 'snowball/components';
import UserEditForm from '../components/UserEditForm';
import { inject } from 'snowball/app';

function UserEdit({ onSave }) {
    return (
        <>
            <Header
                title="编辑资料"
                backText="取消"
                buttons={
                    <button
                        className="ue_save_btn"
                        onClick={onSave}
                    >完成</button>
                }
            ></Header>
            <MainScrollView>
                <UserEditForm></UserEditForm>
            </MainScrollView>
        </>
    );
}

export default inject(({ userEditService }) => {
    return userEditService
        ? {
            onSave: userEditService.onSave.emit
        }
        : null;
})(UserEdit);