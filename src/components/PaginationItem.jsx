const PaginationItem = ({ page, text, isActive, setCurrentPage }) => {

    const classes = 'relative block rounded  px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 hover:text-blue-900';

    const classesDefault = `${classes} bg-transparent cursor-pointer`;
    const classesActive = `${classes} bg-white text-blue-900`

    return(
        <li>
            <a
                className={(isActive ? classesActive : classesDefault)}
                onClick={() => {setCurrentPage(page)}}>{text}</a>
        </li>
    )
}

export default PaginationItem;
