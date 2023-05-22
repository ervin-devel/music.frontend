import PaginationItem from "./PaginationItem";

const Pagination = ({ currentPage, setCurrentPage, lastPage }) => {

    const pageNumbers = [];
    for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i);
    }

    return(
        <div>
            <nav aria-label="Page navigation example">
                <ul className="list-style-none flex mt-10">
                    { (currentPage > 1 ? <PaginationItem isActive={false} page={(currentPage - 1)} text="Previous" setCurrentPage={setCurrentPage}/> : '') }
                    { pageNumbers.map(page => <PaginationItem isActive={currentPage === page} page={page} text={page} setCurrentPage={setCurrentPage}/>) }
                    { (lastPage > currentPage ? <PaginationItem isActive={false} page={(currentPage + 1)} text="Next" setCurrentPage={setCurrentPage}/> : '' ) }
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;
