import React from 'react';
import { Header, MainScrollView } from 'snowball/components';
import SettingUserInfo from '../components/SettingUserInfo';

export default function Setting() {
    return (
        <>
            <Header title="设置" />
            <MainScrollView>
                <SettingUserInfo></SettingUserInfo>
            </MainScrollView>
        </>
    );
}