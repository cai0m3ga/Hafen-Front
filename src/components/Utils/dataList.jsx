import React from "react";

import {
    Row,
    Col
} from "reactstrap";

const DataList = (props) => {

    //Standard props

    const cssClasses = (props.cssClasses ? props.cssClasses : "");
    const tableCollumns = (props.tableCollumns ? props.tableCollumns : []);
    const tableData = (props.tableData ? props.tableData : []);
    const loading = (props.loading == null ? false : props.loading);

    //Pagination props
    
    const paging = (props.paging == null ? false : props.paging);
    const pageSize = (props.pageSize == null ? null : props.pageSize);
    const currentPage = (props.currentPage == null ? null : props.currentPage);
    const total = (props.total == null ? null : props.total);    
    const pageChangeHandler = (props.pageChangeHandler == null ? () => { } : props.pageChangeHandler);

    //Standard props treatment

    if (!loading && (tableCollumns.length == 0 || tableData.length == 0)) {

        console.error('dataList: missing parameter "tableCollumns" or "tableData".', tableCollumns, tableData);
        return (<></>);

    }


    let totalSize = tableCollumns.reduce((acc, cur) => {

        return acc + cur.size;

    }, 0);

    let treatedCollumns = tableCollumns.map((item) => {

        item.size = ((item.size * 100) / totalSize) + "%";
        return item;

    });

    //Pagination props treatment    
    const events = { first: 'first', previous: 'previous', next: 'next', last: 'last' };
    let pageStart = 0;
    let pageEnd = 0;
    let totalPages = 0;
    let treatedCurrentPage = 0;
    let treatedTotal = 0;
    let navigationItems = [];

    if (paging && !loading) {

        if (Number.isNaN(parseInt(currentPage)) || Number.isNaN(parseInt(pageSize)) || Number.isNaN(parseInt(total))) {

            if (Number.isNaN(parseInt(currentPage)))
                console.error('dataList: missing or incomplete parameter "currentPage".', currentPage);

            if (Number.isNaN(parseInt(pageSize)))
                console.error('dataList: missing or incomplete parameter "pageSize".', pageSize);

            if (Number.isNaN(parseInt(total)))
                console.error('dataList: missing or incomplete parameter "total".', total);

            return (<></>);

        }

        treatedCurrentPage = parseInt(currentPage) + 1;
        treatedTotal = parseInt(total);
        pageStart = ((pageSize * treatedCurrentPage) - pageSize) + 1;
        pageEnd = (pageStart + tableData.length) -1;
        totalPages = Math.ceil(treatedTotal / pageSize);

        if (totalPages === 1) {

            navigationItems.push(<li class="page-item active" key={'p1'}><a class="page-link" href="#">1</a></li>);

        } else if (totalPages === 2) {

            if (treatedCurrentPage == 1) {

                navigationItems.push(<li class="page-item active" key={'p1'}><a class="page-link" href="#">1</a></li>);
                navigationItems.push(<li class="page-item" key={'p2'}><a class="page-link" href="#" onClick={() => { changePage(2) }}>2</a></li>);

            } else {

                navigationItems.push(<li class="page-item" key={'p1'}><a class="page-link" href="#" onClick={() => { changePage(1) }}>1</a></li>);
                navigationItems.push(<li class="page-item active" key={'p2'}><a class="page-link" href="#">2</a></li>);

            }

        } else {

            if (treatedCurrentPage === 1) {

                navigationItems.push(<li class="page-item active" key={'p1'}><a class="page-link" href="#">1</a></li>);
                navigationItems.push(<li class="page-item" key={'p2'}><a class="page-link" href="#" onClick={() => { changePage(2) }}>2</a></li>);
                navigationItems.push(<li class="page-item" key={'p3'}><a class="page-link" href="#" onClick={() => { changePage(3) }}>3</a></li>);

            } else if (treatedCurrentPage === totalPages) {

                navigationItems.push(<li class="page-item" key={'p' + (totalPages - 2)}><a class="page-link" href="#" onClick={() => { changePage(totalPages - 2) }}>{totalPages - 2}</a></li>);
                navigationItems.push(<li class="page-item" key={'p' + (totalPages - 1)}><a class="page-link" href="#" onClick={() => { changePage(totalPages - 1) }}>{totalPages - 1}</a></li>);
                navigationItems.push(<li class="page-item active" key={'p' + (totalPages)}><a class="page-link" href="#">{totalPages}</a></li>);

            } else {

                navigationItems.push(<li class="page-item" key={(treatedCurrentPage - 1)}><a class="page-link" href="#" onClick={() => { changePage(treatedCurrentPage - 1) }}>{treatedCurrentPage - 1}</a></li>);
                navigationItems.push(<li class="page-item active" key={'p' + treatedCurrentPage}><a class="page-link" href="#">{treatedCurrentPage}</a></li>);
                navigationItems.push(<li class="page-item" key={(treatedCurrentPage + 1)}><a class="page-link" href="#" onClick={() => { changePage(treatedCurrentPage + 1) }}>{treatedCurrentPage + 1}</a></li>);

            }

        }

    }

    let changePage = (index) => {

        if (index == treatedCurrentPage)
            return;

        if (index < 1 || index > totalPages)
            return;

        pageChangeHandler(index - 1);

    };

    let changePageEvent = (event) => {

        let treatedEvent = null;
        let index = treatedCurrentPage;

        try {

            treatedEvent = events[event];

        } catch {

            treatedEvent = null;

        }

        if (treatedEvent == null)
            return;

        if (treatedEvent === events.first)
            index = 1;

        if (treatedEvent === events.previous)
            index -= 1;

        if (treatedEvent === events.next)
            index += 1;

        if (treatedEvent === events.last)
            index = totalPages;

        changePage(index);

    };

    return (

        <>

            {(loading) ?

                <div className="dataList" data-testid="dataList-loading">

                    <h1>Loading...</h1>

                </div>

                :

                <div className={"dataList " + cssClasses} data-testid="dataList-table">

                    <div className={"collumns color-text-table"}>

                        {
                            treatedCollumns.map((item) => {

                                let collumnName = ' ';

                                if (item.name)
                                    collumnName = item.name;

                                return (<div data-testid={"dataList-collumn-" + collumnName} style={{ width: item.size }} key={item.property}>{collumnName}</div>);

                            })
                        }

                    </div>

                    <div className="clear"></div>

                    <div className="items">

                        {
                            tableData.map((item, index) => (

                                <div className={"dataRow"} key={"row" + index}>

                                    {
                                        treatedCollumns.map((collumn, columnIndex) => {

                                            let collumnValue = null;

                                            try {

                                                collumnValue = item[collumn.property];

                                            } catch {

                                                collumnValue = null;

                                            }

                                            let key = collumn.property + "" + item.id;
                                            return (<div className="item" style={{ width: collumn.size }} key={key}>{collumnValue}</div>);

                                        })
                                    }

                                    <div className="clear"></div>

                                </div>

                            ))
                        }

                    </div>

                    {(!paging) ||

                        <Row className="mb-7 mt-7">

                            <Col>

                                <span>
                                    Showing {pageStart}-{pageEnd} of {treatedTotal} records
                                </span>

                            </Col>

                            <Col>

                                <nav aria-label="Page navigation example">

                                    <ul class="pagination justify-content-end">

                                        <li class="page-item">

                                            <a class="page-link" href="#" tabIndex="-1" onClick={() => { changePageEvent(events.first); }}>

                                                <i class="fa fa-angle-left"></i><i class="fa fa-angle-left"></i>
                                                <span class="sr-only">First</span>

                                            </a>

                                        </li>

                                        <li class="page-item">

                                            <a class="page-link" href="#" onClick={() => { changePageEvent(events.previous); }}>

                                                <i class="fa fa-angle-left"></i>
                                                <span class="sr-only">Previous</span>

                                            </a>

                                        </li>

                                        {navigationItems}

                                        <li class="page-item">

                                            <a class="page-link" href="#" onClick={() => { changePageEvent(events.next); }}>

                                                <i class="fa fa-angle-right"></i>
                                                <span class="sr-only">Next</span>

                                            </a>

                                        </li>

                                        <li class="page-item">

                                            <a class="page-link" href="#" onClick={() => { changePageEvent(events.last); }}>

                                                <i class="fa fa-angle-right"></i><i class="fa fa-angle-right"></i>
                                                <span class="sr-only">Last</span>

                                            </a>

                                        </li>

                                    </ul>

                                </nav>

                            </Col>

                        </Row>

                    }

                </div>

            }

        </>

    );

}

export default DataList;