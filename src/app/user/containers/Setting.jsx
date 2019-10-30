import React from 'react';
import { Header, MainScrollView } from 'snowball/components';
import UserInfoToEdit from '../components/UserInfoToEdit';

export default function Setting() {
    return (
        <>
            <Header title="设置" />
            <MainScrollView>
                <UserInfoToEdit></UserInfoToEdit>
            </MainScrollView>
        </>
    );
}