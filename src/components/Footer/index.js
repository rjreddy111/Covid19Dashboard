import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div>
      <h1 className="footer-header">
        COVID19<span className="footer-span"> INDIA</span>
      </h1>
      <p className="footer-text">
        {' '}
        We stand with everyone fighting on the front lines
      </p>
      <div className="social-meda-container">
        <VscGithubAlt className="icons" />
        <FiInstagram className="icons" />
        <FaTwitter className="icons" />
      </div>
    </div>
  )
}
