import React from "react";
import { MainScrollView } from "snowball/components";
import { renderBricks } from "../../brick";

function Market({ pageData, bricks, ctx }) {
    return (
        <div>
            <header className="app-header">
                <div className="app-header-title">{pageData.name}</div>
            </header>
            <MainScrollView>
                {renderBricks(pageData, bricks, ctx)}
            </MainScrollView>
        </div>
    );
}

export default Market;