import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import AboutFaqsComponent from '../AboutFaqsComponent'
import AboutFactoids from '../AboutFactoids'

import './index.css'

class About extends Component {
  state = {aboutList: {}, isLoading: true, aboutFaqs: []}

  componentDidMount() {
    this.getAboutPage()
  }

  getAboutPage = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const bannerData = data.factoids.map(eachData => ({
        banner: eachData.banner,
        id: eachData.id,
      }))
      const aboutFaqsData = data.faq.map(eachData => ({
        aboutFaqAnswer: eachData.answer,
        aboutFaqQuestioncategory: eachData.category,
        aboutFaqsQuestion: eachData.question,
        aboutFaqQuestionNum: eachData.qno,
      }))

      this.setState({
        aboutList: bannerData,
        aboutFaqs: aboutFaqsData,
        isLoading: false,
      })
    } else {
      console.log('Data not available')
    }
  }

  renderAboutPage = () => {
    const {aboutFaqs, aboutList} = this.state
    console.log(aboutFaqs)
    return (
      <>
        <ul className="unorder-list" data-testid="faqsUnorderedList">
          {aboutFaqs.map(eachFaq => (
            <AboutFaqsComponent
              eachFaqDetails={eachFaq}
              key={eachFaq.aboutFaqQuestionNum}
            />
          ))}
        </ul>
        <h1 className="factoids">Factoids</h1>
        <ul className="unorder-list">
          {aboutList.map(eachFaq => (
            <AboutFactoids banner={eachFaq.banner} key={eachFaq.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />

        <div className="about-container-main">
          {isLoading ? (
            <div className="loader-design" data-testid="aboutRouteLoader">
              <Loader type="Oval" color="#007BFF" height={50} width={50} />
            </div>
          ) : (
            <>
              <div>
                <h1 className="about-heading">About</h1>
                <p className="about-top-text">Last update on March 28th 2021</p>
                <p className="about-vaccine-text">
                  COVID-19 vaccine are ready for distribution
                </p>
              </div>
              <div>{this.renderAboutPage()}</div>
            </>
          )}
        </div>
      </>
    )
  }
}

export default About
