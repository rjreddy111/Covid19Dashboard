import {Component} from 'react'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import IndianStatesData from '../IndianStatesData'

import SearchSuggestion from '../SearchSuggestion'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    covidData: [],
    isLoading: true,
    searchInput: '',
    searchResults: [],
    confirmedTotal: 0,
    activeTotal: 0,
    deceasedTotal: 0,
    recoveredTotal: 0,
  }

  componentDidMount() {
    this.getCovidData()
  }

  getCovidData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    let confirmedCases = 0
    let activeCases = 0
    let deceasedCases = 0
    let recoveredCases = 0

    statesList.forEach(eachState => {
      if (data[eachState.state_code]) {
        const {total} = data[eachState.state_code]
        confirmedCases += total.confirmed ? total.confirmed : 0
        recoveredCases += total.recovered ? total.recovered : 0
        deceasedCases += total.deceased ? total.deceased : 0
      }
    })
    activeCases += confirmedCases - (recoveredCases + deceasedCases)

    const eachStatesData = statesList.map(eachState => ({
      stateName: eachState.state_name,
      stateCode: eachState.state_code,
      confirmed: Object.keys(data)
        .filter(perState => perState === eachState.state_code)
        .map(each => data[each].total.confirmed),
      recovered: Object.keys(data)
        .filter(perState => perState === eachState.state_code)
        .map(each => data[each].total.recovered),
      deceased: Object.keys(data)
        .filter(perState => perState === eachState.state_code)
        .map(each => data[each].total.deceased),
      population: Object.keys(data)
        .filter(eachData => eachData === eachState.state_code)
        .map(each => data[each].meta.population),
      others: Object.keys(data)
        .filter(eachData => eachData === eachState.state_code)
        .map(each => data[each].total.other),
    }))

    this.setState({
      covidData: eachStatesData,
      isLoading: false,
      confirmedTotal: confirmedCases,
      activeTotal: activeCases,
      recoveredTotal: recoveredCases,
      deceasedTotal: deceasedCases,
    })
  }

  onChangeSearchInput = event => {
    const searchKey = event.target.value
    const searchedList = statesList.filter(eachItem =>
      eachItem.state_code.toLowerCase().includes(searchKey.toLowerCase()),
    )
    this.setState({
      searchInput: event.target.value,
      searchResults: searchedList,
    })
  }

  onSortAscending = () => {
    const {covidData} = this.state
    const asc = covidData.sort((a, b) =>
      a.stateName.toUpperCase() > b.stateName.toUpperCase() ? 1 : -1,
    )
    this.setState({covidData: asc})
  }

  onSortDescending = () => {
    const {covidData} = this.state
    const dsc = covidData.sort((a, b) =>
      a.stateName.toUpperCase() > b.stateName.toUpperCase() ? -1 : 1,
    )
    this.setState({covidData: dsc})
  }

  allStatesStatics = () => {
    const {covidData} = this.state
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
              onClick={this.onSortAscending}
            >
              <FcGenericSortingAsc size={20} />
            </button>
            <button
              className="button-style-sort sorting-container"
              type="button"
              onClick={this.onSortDescending}
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
          {covidData.map(eachData => (
            <IndianStatesData
              eachStateDetails={eachData}
              key={eachData.stateCode}
            />
          ))}
        </ul>
      </div>
    )
  }

  getSuggestionList = () => {
    const {searchResults} = this.state

    return (
      <ul
        className="unorderlist-search-suggestion"
        data-testid="searchResultsUnorderedList"
      >
        {searchResults.map(eachItem => (
          <SearchSuggestion
            stateName={eachItem.state_name}
            stateCode={eachItem.state_code}
            key={eachItem.state_code}
            id={eachItem.state_code}
          />
        ))}
      </ul>
    )
  }

  indianDataStats = () => {
    const {
      confirmedTotal,
      activeTotal,
      recoveredTotal,
      deceasedTotal,
    } = this.state
    return (
      <div className="stats-main-container">
        <div className="each-card" data-testid="countryWideConfirmedCases">
          <p className=" stats-text confiremed">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dookgusbq/image/upload/v1687876830/check-mark_1_h8agda.png"
            alt="country wide confirmed cases pic"
          />
          <p className="count-text confiremed">{confirmedTotal}</p>
        </div>

        <div className="each-card" data-testid="countryWideActiveCases">
          <p className="stats-text active">Active</p>
          <img
            src="https://res.cloudinary.com/dookgusbq/image/upload/v1688115293/protection_1_zuwv8w.png"
            alt="country wide active cases pic"
          />
          <p className="count-text active">{activeTotal}</p>
        </div>

        <div className="each-card" data-testid="countryWideRecoveredCases">
          <p className="stats-text recovered">Recovered</p>
          <img
            src="https://res.cloudinary.com/dookgusbq/image/upload/v1688117236/recovered_1_nip8pf.png"
            alt="country wide recovered cases pic"
          />
          <p className="count-text recovered">{recoveredTotal}</p>
        </div>

        <div className="each-card" data-testid="countryWideDeceasedCases">
          <p className="stats-text deceased">Deceased</p>
          <img
            src="https://res.cloudinary.com/dookgusbq/image/upload/v1688117288/breathing_1_m5fimo.png"
            alt="country wide deceased cases pic"
          />
          <p className="count-text deceased">{deceasedTotal}</p>
        </div>
      </div>
    )
  }

  renderHomeElementsContainer = () => {
    const {searchInput, searchResults} = this.state
    const suggestions =
      searchResults.length === 0 ? '' : this.getSuggestionList()

    return (
      <>
        <div className="home-search-input">
          <div className="search-input-container">
            <BsSearch height={20} color="#64748b" testid="searchIcon" />
            <input
              type="search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              placeholder="Search the State"
              className="search-input"
            />
          </div>

          {searchInput.length > 0 ? suggestions : ''}
        </div>
        {this.indianDataStats()}
        {this.allStatesStatics()}
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <Header />
        <div className="main-home-container">
          {isLoading ? (
            <div className="loader-design" data-testid="homeRouteLoader">
              <Loader type="Oval" color="#007BFF" height={50} width={50} />
            </div>
          ) : (
            <>
              {this.renderHomeElementsContainer()}
              <Footer />
            </>
          )}
        </div>
      </>
    )
  }
}

export default Home
