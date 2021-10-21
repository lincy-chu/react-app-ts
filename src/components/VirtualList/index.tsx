import { useEffect, useRef, useState, UIEvent, useMemo } from "react";
import {VirtualListProps} from "@/types";

const initProps = {containerHeight: 500, itemHeight: 100, showEnd: true }
export default function Index(props: VirtualListProps) {
    /* 页面容器高度 */
    /* 列表项高度 */
    const { containerHeight, itemHeight, dataList, childrenComponent: Children, showEnd } = Object.assign(initProps, props)

    /* 预加载数量 */
    const preLoadCount: number = containerHeight / itemHeight;

    /* 初始化加载数量 */
    const initLoadCount: number = Math.ceil(preLoadCount);

    /* 数据 */
    const [sourceData, setSourceData] = useState<number[]>([]);

    /* showPage 控制页面显示元素的数量 */
    const [showRange, setShowPageRange] = useState({
        start: 0,
        end: initLoadCount
    });

    /** 容器Ref */
    const containerRef = useRef<HTMLDivElement | null>(null);

    /**
     * 初始化列表显示数据
     */
    const createListData = () => {
        const initialList: number[] = dataList.length > initLoadCount ? dataList.slice(0, initLoadCount) : dataList
        setSourceData(initialList);
    };

    useEffect(() => {
        createListData();
    }, []);

    /**
     * 计算元素范围
     */
    const calculateRange = () => {
        const element = containerRef.current;
        if (element) {
            const offset: number = Math.floor(element.scrollTop / itemHeight) + 1;
            const viewItemSize: number = Math.ceil(element.clientHeight / itemHeight);
            const startSize: number = offset - preLoadCount;
            const endSize: number = viewItemSize + offset + preLoadCount;
            setShowPageRange({
                start: startSize < 0 ? 0 : startSize,
                end: endSize >= sourceData.length ? sourceData.length : endSize
            });
        }
    };

    /**
     * 计算当前是否已经到底底部
     * @returns 是否到达底部
     */
    const reachScrollBottom = (): boolean => {
        const { current } = containerRef
        const contentScrollTop = current?.scrollTop || 0; //滚动条距离顶部
        const clientHeight = current?.clientHeight || 0; //可视区域
        const scrollHeight = current?.scrollHeight || 0; //滚动条内容的总高度
        return contentScrollTop + clientHeight >= scrollHeight;
    };

    /**
     * onScroll事件回调
     * @param event { UIEvent<HTMLDivElement> } scrollView滚动参数
     */
    const onContainerScroll = (event: UIEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (reachScrollBottom()) {
            setTimeout(() => {
                let endIndex = showRange.end;
                let nextSlice = dataList.slice(endIndex, endIndex + 1)
                setSourceData((arr: any[]) => {
                    return [...arr, ...nextSlice];
                });
            }, 0);
        }
        calculateRange();
    };

    /**
     * 当前scrollView展示列表
     */
    const currentViewList = useMemo(() => {
        return sourceData
            .slice(showRange.start, showRange.end)
            .map((el) => ({
                data: el
            }));
    }, [showRange, sourceData]);

    /**
     * scrollView整体高度
     */
    const scrollViewHeight = useMemo(() => {
        return sourceData.length * itemHeight;
    }, [sourceData]);

    /**
     * scrollView 偏移量
     */
    const scrollViewOffset = useMemo(() => {
        return showRange.start * itemHeight;
    }, [showRange.start]);

    const [toEnd, setToEnd] = useState(false)

    useEffect(() => {
        const toEnd = showRange.end === dataList.length
        setToEnd(() => (toEnd))
    }, [showRange.end, sourceData])

    return (
        <div
            ref={containerRef}
            style={{
                height: containerHeight,
                overflow: "auto"
            }}
            className="scrollView"
            onScroll={onContainerScroll}
        >
            <div
                style={{
                    width: "100%",
                    height: scrollViewHeight - scrollViewOffset,
                    marginTop: scrollViewOffset
                }}
            >
                {currentViewList.map((item: any) => (
                    <Children key={item.data} {...item} />
                ))}
                {
                    toEnd && showEnd && <div>我是一个有底线的虚拟列表</div>
                }
            </div>
        </div>
    );
}
