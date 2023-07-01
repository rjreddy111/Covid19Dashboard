import './index.css'

const AboutFaqsComponent = props => {
  const {eachFaqDetails} = props
  const {aboutFaqAnswer, aboutFaqsQuestion} = eachFaqDetails
  return (
    <li className="list-style">
      <p className="about-question">{aboutFaqsQuestion}</p>
      <p className="about-answer">{aboutFaqAnswer}</p>
    </li>
  )
}

export default AboutFaqsComponent
