

import React from 'react';
import { inject } from 'snowball/app';
import CategoryList from '../components/CategoryList';
import SubCateList from '../components/SubCateList';
import { Header } from 'snowball/components';

function Category({ visible = true, showBack, cates, currentCate, onChange, onClickSubSubCate }) {
    return (
        <div className="cg_wrap" style={{ display: visible ? 'block' : 'none' }}>
            <Header
                back={showBack}
                title="分类"
            >
            </Header>
            <div className="cg_main dp_f app-main ai_s" >
                <CategoryList
                    cates={cates}
                    currentCate={currentCate}
                    onChange={onChange}
                />
                <SubCateList
                    subCates={currentCate && currentCate.children}
                    onClickSubSubCate={onClickSubSubCate}
                />
            </div>
        </div>
    );
}

export default inject(({ categoryViewService }) => {
    return {
        cates: categoryViewService.cates,
        currentCate: categoryViewService.currentCate,
        onChange: categoryViewService.onCateChange.emit,
        onClickSubSubCate: categoryViewService.onClickSubSubCate.emit
    };
})(Category);