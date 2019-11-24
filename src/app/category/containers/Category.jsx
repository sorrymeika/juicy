

import React from 'react';
import { inject } from 'snowball/app';
import CategoryList from '../components/CategoryList';
import SubCateList from '../components/SubCateList';
import { Header } from 'snowball/components';

function Category({ visible = true, showBack, cates, currentCate, onChange }) {
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
                <SubCateList subCates={currentCate && currentCate.children} />
            </div>
        </div>
    );
}

export default inject(({ categoryService }) => {
    return {
        cates: categoryService.cates,
        currentCate: categoryService.currentCate,
        onChange: categoryService.onCateChange.emit
    };
})(Category);