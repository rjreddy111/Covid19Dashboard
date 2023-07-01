import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import StateCards from '../StateCards'
import TopDistrictData from '../TopDistrictData'
import GraphCharts from '../GraphCharts'

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

class StateWise extends Component {
  state = {
    stateData: [],
    isLoading: true,
    totalTested: 0,
    stateName: '',

    dateSet: '',

    stateCode: '',

    category: 'Confirmed',
    isActiveStateCard: true,
    districtList: [],
  }

  componentDidMount() {
    this.getCovidData()
  }

  getCovidData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data/'
    const options = {
      method: 'GET',
    }
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const totalNumberTested = data[stateCode].total.tested

      const isStateCodePresent = statesList.filter(
        eachItem => eachItem.state_code === stateCode,
      )

      const stateNameFromList = isStateCodePresent[0].state_name

      const stateDistrictData = data[stateCode].districts

      const stateTotalData = data[stateCode].total
      const newDate = new Date(data[stateCode].meta.last_updated)

      this.setState({
        isLoading: false,
        stateName: stateNameFromList,
        stateData: stateTotalData,
        totalTested: totalNumberTested,
        dateSet: newDate,

        stateCode,
        districtList: stateDistrictData,
      })
    } else {
      console.log('Fetch error')
    }
  }

  districtData = () => {
    const {category, districtList} = this.state

    const listOfDistrict = Object.keys(districtList)
    const loweredCategory = category.toLowerCase()
    const dataElementOfEachDistrict = listOfDistrict.map(eachName => ({
      eachDistrictName: eachName,
      eachDistrictValue: districtList[eachName].total[loweredCategory]
        ? districtList[eachName].total[loweredCategory]
        : 0,
    }))

    dataElementOfEachDistrict.sort(
      (a, b) => b.eachDistrictValue - a.eachDistrictValue,
    )

    const stateActiveCases = listOfDistrict.map(eachName => ({
      eachDistrictName: eachName,
      eachDistrictValue:
        districtList[eachName].total.confirmed -
        (districtList[eachName].total.recovered +
          districtList[eachName].total.deceased)
          ? districtList[eachName].total.confirmed -
            (districtList[eachName].total.recovered +
              districtList[eachName].total.deceased)
          : 0,
    }))

    stateActiveCases.sort((a, b) => b.eachDistrictValue - a.eachDistrictValue)

    const stateRecoveredCases = listOfDistrict.map(eachName => ({
      eachDistrictName: eachName,
      eachDistrictValue: districtList[eachName].total.recovered,
    }))

    stateRecoveredCases.sort(
      (a, b) => b.eachDistrictValue - a.eachDistrictValue,
    )

    const stateDeceasedCases = listOfDistrict.map(eachName => ({
      eachDistrictName: eachName,
      eachDistrictValue: districtList[eachName].total.deceased,
    }))

    stateDeceasedCases.sort((a, b) => b.eachDistrictValue - a.eachDistrictValue)

    switch (loweredCategory) {
      case 'active':
        return stateActiveCases

      case 'recovered':
        return stateRecoveredCases

      case 'deceased':
        return stateDeceasedCases

      default:
        return dataElementOfEachDistrict
    }
  }

  activeCategory = assignedCategory => {
    this.setState({isActiveStateCard: false, category: assignedCategory})
  }

  renderStateWiseData = () => {
    const {
      totalTested,
      stateName,
      dateSet,
      stateData,

      stateCode,
      isActiveStateCard,
      category,
    } = this.state
    const date = new Date(dateSet)

    const districtTop = this.districtData()

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    return (
      <>
        <div className="state-respective-container">
          <div className="state-wise-top-lines">
            <div>
              <div className="state-name">
                <h1>{stateName}</h1>
              </div>
              <p className="updated-date-text">{`Last updated on ${
                months[date.getMonth()]
              } ${date.getDate()}th ${date.getFullYear()}.
               `}</p>
            </div>
            <div>
              <p className="tested-text">Tested</p>
              <p className="total-tested-nubers">{totalTested}</p>
            </div>
          </div>
          <div className="state-cards">
            <StateCards
              stateData={stateData}
              isActive={isActiveStateCard}
              activeCategory={this.activeCategory}
            />
          </div>
          <div>
            <h1 className={`top-distrit-heading ${category}`}>Top Districts</h1>
            <ul
              data-testid="topDistrictsUnorderedList"
              className="state-top-district-unordered"
            >
              {districtTop.map(eachItem => (
                <TopDistrictData
                  districtTopName={eachItem.eachDistrictName}
                  districtTopCases={eachItem.eachDistrictValue}
                  key={eachItem.eachDistrictName}
                />
              ))}
            </ul>
          </div>
          <div
            className="charts-main-container"
            data-testid="lineChartsContainer"
          >
            <GraphCharts stateCode={stateCode} specificChart={category} />
          </div>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />

        <div className="state_wise-main-container">
          {isLoading ? (
            <div className="loader-design" data-testid="stateDetailsLoader">
              <Loader type="Oval" color="#007BFF" height={50} width={50} />
            </div>
          ) : (
            <>
              {this.renderStateWiseData()}
              <Footer />
            </>
          )}
        </div>
      </>
    )
  }
}

export default StateWise
