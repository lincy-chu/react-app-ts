import React, {useEffect, useRef, useState} from "react"
import {scrollState} from "@/types";

function useScroll() {
    const dom = useRef(null)
    const [scrollOptions, setScrollOptions] = useState<scrollState>({
        top: 0,
        suctionTop: false,
        opacity: 1
    });

    useEffect(() => {
        const box = (dom.current) as any;
        const offsetHeight = box.offsetHeight;
        const radio = box.offsetHeight / 500 * 20;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            /* 控制透明度 */
            const computerOpacity = 1 - scrollY / 160;
            /* 控制吸顶效果 */
            const offsetTop = offsetHeight - scrollY - offsetHeight / 500 * 85;
            const top = 0 - scrollY / 5;

            setScrollOptions({
                top,
                suctionTop: offsetTop < radio,
                opacity: computerOpacity <= 0 ? 0: computerOpacity
            });

            document.addEventListener('scroll', handleScroll);

            return function() {
                document.removeEventListener('scroll', handleScroll);
            }
        };

    }, []);
    return [scrollOptions, dom];
}

function HooksIndex() {
    const [scrollOptions, domRef] = useScroll()

    const { top, suctionTop, opacity } = scrollOptions as any;

    // @ts-ignore
    return (
        <div style={{position: 'static', height: '2000px'}}>
            <div style={{color: 'white', height: '300px'}} />
            <div ref={domRef} style={{opacity, transform: `translateY(${top}px)`}}>
                <div style={{height: '600px'}}>
                    <span>测试一下</span>
                </div>
            </div>
            <div className={suctionTop ? 'box_card suctionTop' : 'box_card'}>
                <div
                    style={{
                        background: 'red',
                        boxShadow: '0px 15px 10px -16px #F02F0F'
                    }}
                    className='reultCard'
                >
                </div>
            </div>
        </div>
    );
}

export default HooksIndex;
