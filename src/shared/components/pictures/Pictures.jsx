import React, { Component } from 'react';
import { $, util, ViewModel } from 'snowball';
import { inject, mapViewModelToProps } from 'snowball/app';
import { PhotoViewer } from "snowball/components";

type PicturesProps = {
    pictures: string[],
    onReleaseToSeeMore?: () => any
};

class Pictures extends Component<PicturesProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            x: 0,
            isReleaseToSeeMore: false,
        };

        var isStart = false;
        var isMove = false;
        var startPageX;
        var startPageY;
        var startX;
        var moveX;
        var wrapWidth;
        var minX;
        var contentEl;

        this.touchStart = (e) => {
            contentEl = e.currentTarget.querySelector('ul');
            if (contentEl) {
                isStart = true;
                isMove = false;
                moveX = startPageX = e.touches[0].pageX;
                startPageY = e.touches[0].pageY;
                startX = this.state.x || 0;
                wrapWidth = e.currentTarget.clientWidth;
                minX = (this.props.pictures.length - 1) * wrapWidth * -1;
                util.reflow($(contentEl).removeClass('t_3'));
                this.right = 0;
            }
        };

        this.touchMove = (e) => {
            if (isStart) {
                moveX = e.touches[0].pageX;
                var offsetX = moveX - startPageX;
                var offsetY = e.touches[0].pageY - startPageY;

                if (Math.abs(offsetY) > Math.abs(offsetX)) {
                    isStart = false;
                    return;
                }

                this.right = 0;

                this.setState({
                    x: startX + offsetX > 0
                        ? startX + (offsetX / 3)
                        : startX + offsetX < minX
                            ? minX + (this.right = ((startX + offsetX - minX) / 3))
                            : startX + offsetX
                });

                this.setState({
                    isReleaseToSeeMore: this.right < -60
                });

                isMove = true;
                e.preventDefault();
                e.stopPropagation();
            }
        };

        this.touchEnd = (e) => {
            if (isStart && isMove) {
                isStart = isMove = false;

                var index = Math.floor(startX * -1 / wrapWidth);
                index = this.state.x < startX ? index + 1 : (index - 1);
                index = Math.max(0, Math.min((this.props.pictures.length - 1), index));

                $(contentEl).addClass('t_3');

                this.setState({
                    x: wrapWidth * index * -1,
                    index
                });

                if (this.right < -60) {
                    this.onReleaseToSeeMore();
                }
                e.stopPropagation();
            }
        };
    }

    onReleaseToSeeMore() {
        this.props.onReleaseToSeeMore && this.props.onReleaseToSeeMore();
    }

    showPhotoViewer = () => {
        const { pictures } = this.props;
        const self = this;
        const slotItems = [];

        const after = new ViewModel({
            el: `<div class="flex it_pictures_more it_pictures_view_more"><p class="iconfont icon-next mr_m {(isReleaseToSeeMore ? 'rot_180' : '')}"></p><p class="text fs_m">{(isReleaseToSeeMore ? '释放' : '继续滑动') + '查看详情'}</p></div>`,
            attributes: {
                isReleaseToSeeMore: false
            }
        });

        const photoViewer = PhotoViewer.show(
            pictures.map((src) => ({
                src
            })),
            {
                index: this.state.index,
                after() {
                    return after;
                },
                slotItems: slotItems,
                // onPhotoChange: this.onPhotoViewerChange,
                onBounceMove(distance) {
                    after.set({
                        isReleaseToSeeMore: distance > 140
                    });
                },
                onBounceBack(distance) {
                    if (distance > 70) {
                        PhotoViewer.hide();
                        self.onReleaseToSeeMore();
                    }
                }
            }
        );
        return photoViewer;
    }

    render() {
        const { pictures = [] } = this.props;

        return (
            <div
                className={"it_pictures w_1x ps_r of_h bd_b" + (!pictures.length ? ' img_default_bg' : '')}
                onTouchStart={this.touchStart}
                onTouchMove={this.touchMove}
                onTouchEnd={this.touchEnd}
                item-component-name="basic"
            >
                {
                    pictures.length
                        ? (
                            <ul
                                className="flex"
                                style={{
                                    width: pictures.length * 100 + '%',
                                    transform: 'translate(' + this.state.x + 'px,0%) translateZ(0)',
                                    WebkitTransform: 'translate(' + this.state.x + 'px,0%) translateZ(0)'
                                }}
                            >
                                {
                                    pictures.map((pic) => {
                                        return <li
                                            key={pic}
                                            className="flex_0"
                                            onClick={this.showPhotoViewer}
                                        ><img alt="" className="w_1x dp_b img" src={pic} /></li>;
                                    })
                                }
                                <li className="it_pictures_more flex">
                                    <p className={"iconfont icon-next mr_m " + (this.state.isReleaseToSeeMore ? 'rot_180' : '')}></p>
                                    <p className="text fs_m">{(this.state.isReleaseToSeeMore ? '释放' : '继续滑动') + '查看详情'}</p>
                                </li>

                            </ul>
                        )
                        : null
                }
            </div>
        );
    }
}

export default inject(mapViewModelToProps('picturesViewModel'))(Pictures);