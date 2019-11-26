import React, { useRef, useEffect } from 'react';
import { Header, MainScrollView } from 'snowball/components';
import { inject } from 'snowball/app';

function SearchInput({ keywords, onSubmit, onChange }) {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className="sc_search_input_wrap">
            <Header
                className="sc_search_input_header"
                back={false}
            >
                <div className="flex w_1x">
                    <form
                        action=""
                        className="sc_search_form fx_1 flex"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        <i className="iconfont icon-search"></i>
                        <input
                            ref={inputRef}
                            type="search"
                            autocomplete="off"
                            name="keywords"
                            value={keywords}
                            placeholder="请输入关键词"
                            className="fx_1 dp_b"
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </form>
                    <button
                        type="button"
                        className="sc_search_submit"
                        onClick={onSubmit}
                    >搜索</button>
                </div>
            </Header>
            <MainScrollView
                className="sc_search_input"
            >
                <div className="sc_search_input_history">
                    <div className="flex">
                        <div className="fx_1">历史搜索</div>
                        <button className="iconfont icon-delete"></button>
                    </div>
                    <ul>
                        <li className="dp_ib">asdf</li>
                    </ul>
                </div>
                <div className="sc_search_input_hot">
                    <div className="hd">热门搜索</div>
                    <ul>
                        <li className="dp_ib">asdf</li>
                    </ul>
                </div>
            </MainScrollView>
        </div>
    );
}

export default inject(({ searchInputService }) => {

    return {
        keywords: searchInputService.keywords,
        onChange: searchInputService.onChange.emit,
        onSubmit: searchInputService.onSubmit.emit
    };
})(SearchInput);