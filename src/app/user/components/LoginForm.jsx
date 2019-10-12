import React, { useState } from 'react';
import { inject } from 'snowball/app';

function LoginForm({ onSubmit }) {
    const [account, setAccount] = useState('');
    const [verifyCode, setVerifyCode] = useState('');

    return (
        <form className="lo_form">
            <div className="lo_logo"></div>
            <div className="lo_form_item bd_b">
                <input
                    type="tel"
                    placeholder="请输入手机号码"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                />
            </div>
            <div className="lo_form_item bd_b flex">
                <div className="fx_1">
                    <input
                        type="tel"
                        placeholder="请输入验证码"
                        value={verifyCode}
                        onChange={(e) => setVerifyCode(e.target.value)}
                    />
                </div>
                <button
                    className="verify_code_btn"
                    type="button"
                    disabled={!account}
                >获取验证码</button>
            </div>
            <div className="lo_login_footer">
                <button
                    className="lo_login_btn"
                    type="button"
                    disabled={!account || !verifyCode}
                    onClick={() => onSubmit({ account, verifyCode })}
                >登录</button>
            </div>
        </form>
    );
}

export default inject(({ loginService }) => (
    loginService
        ? {
            onSubmit: loginService.onSubmit.emit
        }
        : null
))(LoginForm);