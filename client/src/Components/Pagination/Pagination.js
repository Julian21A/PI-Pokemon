import './Pagination.css'

const PageSystem = ({ pkmnPerPage, totalPkmn, paginate, actPage }) => {
    const pageNumbers = [];
    const maxPages = Math.ceil(totalPkmn / pkmnPerPage);

    for (let i = 1; i <= maxPages; i++) {
        pageNumbers.push(i);
    };

    const setPage = (n) => {
        paginate(n);
        localStorage.setItem("page", n);
    }; 

    return (
        <div className="pagination">
            <ul>
                <li>
                    {actPage !== 1 && (
                        <a className='page' href="#h" onClick={() => actPage > 1 && setPage(actPage - 1)}>
                            prev
                        </a>
                    )}
                </li>
                {pageNumbers.map((n) => (
                    <li key={n}>
                        <a className='page' onClick={() => setPage(n)} href="#h">
                            {n}
                        </a>
                    </li>
                ))}
                <li>
                    {actPage === maxPages ? (
                        <></>
                    ) : (
                    <a className='page' href="#h" onClick={() => actPage !== maxPages && setPage(actPage + 1)}>
                        next
                    </a>
                    )}
                </li>
            </ul>
        </div>
    )
}

export default PageSystem;