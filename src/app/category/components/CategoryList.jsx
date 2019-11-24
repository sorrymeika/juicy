

import React from 'react';
import { ScrollView } from 'snowball/components';

function CategoryList({ cates, currentCate, onChange }) {
    return (
        <ScrollView
            className="h_1x cg_cate_list"
        >
            {
                cates && cates.map((cate) => {
                    return (
                        <div
                            className={"cg_cate" + (currentCate && currentCate.id == cate.id ? ' curr' : '')}
                            onClick={() => onChange(cate)}
                        >{cate.name}</div>
                    );
                })
            }
        </ScrollView>
    );
}

export default CategoryList;