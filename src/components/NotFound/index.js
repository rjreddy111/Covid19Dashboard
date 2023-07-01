import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dookgusbq/image/upload/v1688127392/Group_7484_cwnsgl.png"
      alt="not-found-pic"
    />
    <h1 className="heading-not-found">Page Not Found</h1>
    <p className="para-not-found">
      We are sorry, the page you requested could not be found <br />
      Please go back to the home page
    </p>
    <Link to="/">
      <button type="button" className="not-found-home-button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
