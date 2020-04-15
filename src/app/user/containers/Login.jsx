import React from 'react';
import { Header, MainScrollView } from 'snowball/components';
import LoginForm from '../components/LoginForm';

export default function Login() {
    return (
        <div className="bg_fff">
            <Header className="lo_header"></Header>
            <MainScrollView className="bg_fff">
                <LoginForm></LoginForm>
            </MainScrollView>
        </div>
    );
}
