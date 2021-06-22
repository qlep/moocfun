import React from 'react'

const FilterInput = (props) => {
    return (
        <form>
            filter:<input value = {props.filterTerm} onChange = {props.handleFilterTermChange}/>
        </form>
    )
}
export default FilterInput