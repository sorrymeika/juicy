import React from 'react';
import { Header, MainScrollView } from 'snowball/components';
import UserEditForm from '../components/UserEditForm';

export default function EditUserInfo() {
    return (
        <>
            <Header
                title="编辑资料"
                backText="取消"
                buttons={
                    <button>完成</button>
                }
            ></Header>
            <MainScrollView>
                <UserEditForm></UserEditForm>
            </MainScrollView>
        </>
    );
}