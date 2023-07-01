import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import IndianStatesData from '../IndianStatesData'

import './index.css'

const AllStatesStatics = props => {
  const {covidData, statesList} = props

  const eachStatesData = statesList.map(eachState => ({
    stateName: eachState.state_name,
    stateCode: eachState.state_code,
    confirmed: Object.keys(covidData)
      .filter(perState => perState === eachState.state_code)
      .map(each => covidData[each].total.confirmed),
    recovered: Object.keys(covidData)
      .filter(perState => perState === eachState.state_code)
      .map(each => covidData[each].total.recovered),
    deceased: Object.keys(covidData)
      .filter(perState => perState === eachState.state_code)
      .map(each => covidData[each].total.deceased),
    population: Object.keys(covidData)
      .filter(eachData => eachData === eachState.state_code)
      .map(each => covidData[each].meta.population),
    others: Object.keys(covidData)
      .filter(eachData => eachData === eachState.state_code)
      .map(each => covidData[each].total.other),
  }))

  const onSortAscending = () => {
    const asc = eachStatesData.sort((a, b) =>
      a.stateName.toUpperCase() > b.stateName.toUpperCase() ? 1 : -1,
    )
    return asc
  }

  const onSortDescending = () => {
    const dsc = eachStatesData.sort((a, b) =>
      a.stateName.toUpperCase() > b.stateName.toUpperCase() ? -1 : 1,
    )
    return dsc
  }

  return (
    <div
      className="state-statics-main-container"
      data-testid="stateWiseCovidDataTable"
    >
      <div className="table-headers">
        <div className="states-ut-name-column">
          <p>States/UT</p>

          <button
            data-testid="ascendingSort"
            className="button-style-sort sorting-container"
            type="button"
            onClick={onSortAscending}
          >
            <FcGenericSortingAsc size={20} />
          </button>
          <button
            className="button-style-sort sorting-container"
            type="button"
            onClick={onSortDescending}
            data-testid="descendingSort"
          >
            <FcGenericSortingDesc size={20} />
          </button>
        </div>

        <p className="each-table-column">Confirmed</p>

        <p className="each-table-column">Active</p>

        <p className="each-table-column"> Recovered</p>

        <p className="each-table-column">Deceased</p>

        <p className="each-table-column">Population</p>
      </div>
      <hr className="line" />
      <ul className="unordered-list-states">
        {eachStatesData.map(eachData => (
          <IndianStatesData
            eachStateDetails={eachData}
            key={eachData.stateCode}
          />
        ))}
      </ul>
    </div>
  )
}

export default AllStatesStatics
