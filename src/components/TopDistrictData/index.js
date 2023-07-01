import './index.css'

const TopDistrictData = props => {
  const {districtTopName, districtTopCases} = props

  return (
    <li className="top-districts-list-style">
      <p className="top-district-number">{districtTopCases}</p>
      <p className="top-district-names">{districtTopName}</p>
    </li>
  )
}

export default TopDistrictData
