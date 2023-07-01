import {Link} from 'react-router-dom'
import './index.css'

const IndianStatesData = props => {
  const {eachStateDetails} = props
  const {
    stateName,
    stateCode,
    confirmed,
    recovered,
    deceased,
    population,
    others,
  } = eachStateDetails
  const activeCases = confirmed - (recovered + deceased + others)

  return (
    <li className="state-list-container">
      <div className="staes-column">
        <Link to={`/state/${stateCode}`} className="state-link">
          <p>{stateName}</p>
        </Link>
      </div>
      <div className="each-column confirm">
        <p className="each-case">{confirmed}</p>
      </div>
      <div className="each-column active">
        <p className="each-case">{activeCases}</p>
      </div>
      <div className="each-column recovered">
        <p className="each-case">{recovered}</p>
      </div>
      <div className="each-column deceased">
        <p className="each-case">{deceased}</p>
      </div>
      <div className="each-column">
        <p className="each-case">{population}</p>
      </div>
    </li>
  )
}

export default IndianStatesData
