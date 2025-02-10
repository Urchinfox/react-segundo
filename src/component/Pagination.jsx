
export default function Pagination({handlePage, pageInfo}) {

    return (<>
        <nav>
            <ul className="pagination">
                <li className="page-item" onClick={() => handlePage(pageInfo.current_page - 1)}>
                    <a className={`page-link ${!pageInfo?.has_pre ? 'disabled' : 'none'}`} >
                        上一頁
                    </a>
                </li>


                {Array.from({ length: pageInfo?.total_pages }).map((_, index) => {
                    return (

                        <li className="page-item" key={index} onClick={() => handlePage(index + 1)}>
                            <a className={`page-link ${pageInfo.current_page === index + 1 ? 'active' : 'none'}`} >
                                {index + 1}
                            </a>
                        </li>

                    )
                })}


                <li className="page-item" onClick={() => handlePage(pageInfo.current_page + 1)}>
                    <a className={`page-link ${!pageInfo?.has_next ? 'disabled' : 'none'}`}>
                        下一頁
                    </a>
                </li>
            </ul>
        </nav>
    </>)
}