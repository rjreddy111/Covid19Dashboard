import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Header extends Component {
  render() {
    return (
      <nav className="header-main-container">
        <div>
          <Link to="/" className="home-page-lnk">
            <h1 className="header-heading">
              COVID19<span className="span-india">INDIA</span>
            </h1>
          </Link>
        </div>
        <ul className="headers-link">
          <Link to="/" className="header-buttons">
            <li>Home</li>
          </Link>
          <Link to="/about" className="header-buttons">
            <li>About </li>
          </Link>
        </ul>
      </nav>
    )
  }
}
export default withRouter(Header)
