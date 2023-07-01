import {Component} from 'react'
import './index.css'

class StateCards extends Component {
  state = {
    confirmedCasesCard: {},
    recoveredCasesCard: {},
    deceasedCasesCard: {},
    activeCasesCard: {},
  }

  componentDidMount() {
    this.getDataDistrict()
  }

  getDataDistrict = async () => {
    const {stateData} = this.props

    const confiremedCases = stateData.confirmed
    const recoveredCases = stateData.recovered
    const deceasedCaases = stateData.deceased
    const active =
      stateData.confirmed - stateData.recovered - stateData.deceased
    console.log(confiremedCases)
    const confirmedCasesCard = {
      name: 'Confirmed',
      value: confiremedCases,
    }

    const recoveredCasesCard = {
      name: 'Recovered',
      value: recoveredCases,
    }

    const deceasedCasesCard = {
      name: 'Deceased',
      value: deceasedCaases,
    }
    const activeCasesCard = {
      name: 'Active',
      value: active,
    }

    this.setState({
      confirmedCasesCard,
      deceasedCasesCard,
      activeCasesCard,
      recoveredCasesCard,
    })
  }

  onClickCategory = value => {
    const {activeCategory} = this.props
    activeCategory(value)
  }

  render() {
    const {isActive} = this.props
    const {
      confirmedCasesCard,
      recoveredCasesCard,
      activeCasesCard,
      deceasedCasesCard,
    } = this.state
    const {stateData} = this.props
    const confiremedCases = stateData.confirmed
    const recoveredCases = stateData.recovered
    const deceasedCaases = stateData.deceased
    const active =
      stateData.confirmed - stateData.recovered - stateData.deceased

    console.log(stateData)
    const isActiveCardBgColor = isActive ? 'confirmed-card' : ''
    console.log(confirmedCasesCard.name)
    console.log(confirmedCasesCard.value)

    return (
      <>
        <ul className="state-cards-container">
          <li
            className={`card ${confirmedCasesCard.name}   ${isActiveCardBgColor}`}
            onClick={() => this.onClickCategory(confirmedCasesCard.name)}
            value={confirmedCasesCard.name}
            key={confirmedCasesCard.name}
          >
            <div
              data-testid="stateSpecificConfirmedCasesContainer"
              className="state-card-container"
            >
              <p className="sate-para ">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dookgusbq/image/upload/v1687876830/check-mark_1_h8agda.png"
                alt="state specific confirmed cases pic"
              />
              <p className="state-number">{confiremedCases}</p>
            </div>
          </li>

          <li
            className={`card ${activeCasesCard.name}`}
            onClick={() => this.onClickCategory(activeCasesCard.name)}
            key={activeCasesCard.name}
            value={activeCasesCard.name}
          >
            <div
              data-testid="stateSpecificActiveCasesContainer"
              className="state-card-container"
            >
              <p className="state-para">Active</p>
              <img
                src="https://res.cloudinary.com/dookgusbq/image/upload/v1688115293/protection_1_zuwv8w.png"
                alt="state specific active cases pic"
              />
              <p className="state-number">{active}</p>
            </div>
          </li>

          <li
            className={`card ${recoveredCasesCard.name}`}
            onClick={() => this.onClickCategory(recoveredCasesCard.name)}
            value={recoveredCasesCard.name}
            key={recoveredCasesCard.name}
          >
            <div
              data-testid="stateSpecificRecoveredCasesContainer"
              className="state-card-container"
            >
              <p className="state-para">Recovered</p>
              <img
                src="https://res.cloudinary.com/dookgusbq/image/upload/v1688117236/recovered_1_nip8pf.png"
                alt="state specific recovered cases pic"
              />
              <p className=" state-number">{recoveredCases}</p>
            </div>
          </li>

          <li
            className={`card ${deceasedCasesCard.name}`}
            onClick={() => this.onClickCategory(deceasedCasesCard.name)}
            value={deceasedCasesCard.name}
            key={deceasedCasesCard.name}
          >
            <div
              data-testid="stateSpecificDeceasedCasesContainer"
              className="state-card-container"
            >
              <p className=" state-para">{deceasedCasesCard.name}</p>
              <img
                src="https://res.cloudinary.com/dookgusbq/image/upload/v1688117288/breathing_1_m5fimo.png"
                alt="state specific deceased cases pic"
              />
              <p className="state-number">{deceasedCaases}</p>
            </div>
          </li>
        </ul>
      </>
    )
  }
}

export default StateCards
