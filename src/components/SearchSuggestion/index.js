import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchSuggestion = props => {
  const {stateName, stateCode, id} = props
  console.log(id)

  return (
    <Link to={`/state/${id}`} className="search-list">
      <li className="link-style">
        <p>{stateName}</p>
        <button type="button" className="right-quare-button-container">
          {stateCode}

          <BiChevronRightSquare
            className="right-square-icon"
            testid="searchResultChevronRightIcon"
          />
        </button>
      </li>
    </Link>
  )
}

export default SearchSuggestion
