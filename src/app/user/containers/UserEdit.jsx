import React from 'react';
import { inject, autowired } from 'snowball/app';
import { Header, MainScrollView } from 'snowball/components';
import UserEditForm from '../components/UserEditForm';

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

export default inject(() => {
    const userEditViewModel = autowired('userEditViewModel');
    return {
        onSave: userEditViewModel.onSave
    };
})(UserEdit);