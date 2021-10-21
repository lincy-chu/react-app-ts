import React, {Fragment} from "react";
import VirtualList from "@/components/VirtualList";
import Product from "@/components/Product";

function Index() {
    const dataList = Array.from(Array(30).keys())

    return (
        <Fragment>
            <h3>Index页面</h3>
            <VirtualList
                containerHeight={500}
                itemHeight={100}
                dataList={dataList}
                childrenComponent={Product}
            />
        </Fragment>
    );
}

export default Index;
