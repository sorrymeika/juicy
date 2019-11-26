

import React, { useLayoutEffect, useRef } from 'react';
import { SfsImage } from 'sn-app';
import { ScrollView } from 'snowball/components';

function SubCateList({ subCates, onClickSubSubCate }) {
    const scrollViewRef = useRef();
    useLayoutEffect(() => {
        scrollViewRef.current.scrollToTop();
    }, [subCates]);

    return (
        <ScrollView
            ref={scrollViewRef}
            className="fx_1 cg_subcate_list"
        >
            {
                subCates && subCates.map(subCate => {
                    return (
                        <div className="cg_subcate">
                            <div className="cg_subcate_tit">{subCate.name}</div>
                            <ul className="cg_subcate_con clearfix">
                                {
                                    subCate.children && subCate.children.map((subSubCate) => {
                                        return (
                                            <li
                                                className="fl_l cg_subsubcate"
                                                onClick={() => onClickSubSubCate(subSubCate)}
                                            >
                                                <SfsImage
                                                    className="img"
                                                    src={subSubCate.picture}
                                                />
                                                <p className="name">{subSubCate.name}</p>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    );
                })
            }
        </ScrollView>
    );
}

export default SubCateList;