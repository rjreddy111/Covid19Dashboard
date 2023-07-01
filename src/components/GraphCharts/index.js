import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  Line,
} from 'recharts'

import Loader from 'react-loader-spinner'
import './index.css'

import {Component} from 'react'

class GraphCarts extends Component {
  state = {graphingData: '', isLoading: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/covid19-timelines-data/'
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    const {stateCode} = this.props
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const dataKeyObjects = Object.keys(data[stateCode].dates)
      const dataDateCases = dataKeyObjects.map(eachDate => ({
        eachDate,
        confirmed: data[stateCode].dates[eachDate].total.confirmed,
        recovered: data[stateCode].dates[eachDate].total.recovered,
        deceased: data[stateCode].dates[eachDate].total.deceased,
        tested: data[stateCode].dates[eachDate].total.tested,
        active:
          data[stateCode].dates[eachDate].total.confirmed -
          data[stateCode].dates[eachDate].total.recovered -
          data[stateCode].dates[eachDate].total.deceased,
      }))
      this.setState({graphingData: dataDateCases, isLoading: false})
      console.log(dataDateCases)
    }
  }

  requiredGraph = (chartRequired, color) => {
    const {graphingData} = this.state

    return (
      <>
        <LineChart
          width={900}
          height={300}
          data={graphingData}
          margin={{top: 5, right: 50, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="eachDate"
            stroke={color}
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransformation: 'upperCase',
            }}
          />
          <YAxis stroke={color} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={chartRequired} stroke={color} />
        </LineChart>
      </>
    )
  }

  getOtherCharts = () => (
    <div>
      <h1 className="daily-trends-heading">Daily Spread Trends</h1>
      <div className="graphs-main-container" data-testid="lineChartsContainer">
        <div className="confirmed-red">
          {this.requiredGraph('confirmed', '#FF073A')}
        </div>
        <div className="active-blue">
          {this.requiredGraph('active', '#007BFF')}
        </div>
        <div className="recovered-green">
          {this.requiredGraph('recovered', '#27A243')}
        </div>
        <div className="deceased-grey">
          {this.requiredGraph('deceased', '#6C757D')}
        </div>
        <div className="tested-voilet">
          {this.requiredGraph('tested', '#9673B9')}
        </div>
      </div>
    </div>
  )

  render() {
    const {graphingData, isLoading} = this.state

    const maxData = graphingData.slice(Math.max(graphingData.length - 10, 0))
    console.log(maxData)
    const {specificChart} = this.props
    const requiredChart = specificChart.toLowerCase()

    let barColor = '#9A0E31'
    if (requiredChart === 'confirmed') {
      barColor = '#9A0E31'
    } else if (requiredChart === 'active') {
      barColor = '#0A4FA0'
    } else if (requiredChart === 'recovered') {
      barColor = '#216837'
    } else if (requiredChart === 'deceased') {
      barColor = '#474C57'
    }

    return (
      <>
        {isLoading ? (
          <div className="loader-design" data-testid="timelinesDataLoader">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        ) : (
          <>
            <div className="charts-container-main">
              <div className="bar-char-configuraion">
                <BarChart
                  width={800}
                  height={400}
                  data={maxData}
                  barSize={40}
                  margin={{top: 5, right: 25, left: 20, bottom: 5}}
                >
                  <XAxis
                    dataKey="eachDate"
                    stroke={`${barColor}`}
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 500,
                      textTransformation: 'upperCase',
                    }}
                    dy={10}
                  />

                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey={`${requiredChart}`}
                    fill={`${barColor}`}
                    label={{position: 'top', fill: `${barColor}`}}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </div>
              <div>{this.getOtherCharts()}</div>
            </div>
          </>
        )}
      </>
    )
  }
}

export default GraphCarts
