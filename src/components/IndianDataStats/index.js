import './index.css'

const IndianDataStats = props => {
  const {covidData, statesList} = props

  let confirmedCases = 0
  let activeCases = 0
  let deceasedCases = 0
  let recoveredCases = 0

  statesList.forEach(eachState => {
    if (covidData[eachState.state_code]) {
      const {total} = covidData[eachState.state_code]
      confirmedCases += total.confirmed ? total.confirmed : 0
      recoveredCases += total.recovered ? total.recovered : 0
      deceasedCases += total.deceased ? total.deceased : 0
    }
  })
  activeCases += confirmedCases - (recoveredCases + deceasedCases)

  return (
    <div className="stats-main-container">
      <div className="each-card" data-testid="countryWideConfirmedCases">
        <p className=" stats-text confiremed">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dookgusbq/image/upload/v1687876830/check-mark_1_h8agda.png"
          alt="country wide confirmed cases pic"
        />
        <p className="count-text confiremed">{confirmedCases}</p>
      </div>

      <div className="each-card" data-testid="countryWideActiveCases">
        <p className="stats-text active">Active</p>
        <img
          src="https://res.cloudinary.com/dookgusbq/image/upload/v1688115293/protection_1_zuwv8w.png"
          alt="country wide active cases pic"
        />
        <p className="count-text active">{activeCases}</p>
      </div>

      <div className="each-card" data-testid="countryWideRecoveredCases">
        <p className="stats-text recovered">Recovered</p>
        <img
          src="https://res.cloudinary.com/dookgusbq/image/upload/v1688117236/recovered_1_nip8pf.png"
          alt="country wide recovered cases pic"
        />
        <p className="count-text recovered">{recoveredCases}</p>
      </div>

      <div className="each-card" data-testid="countryWideDeceasedCases">
        <p className="stats-text deceased">Deceased</p>
        <img
          src="https://res.cloudinary.com/dookgusbq/image/upload/v1688117288/breathing_1_m5fimo.png"
          alt="country wide deceased cases pic"
        />
        <p className="count-text deceased">{deceasedCases}</p>
      </div>
    </div>
  )
}

export default IndianDataStats
