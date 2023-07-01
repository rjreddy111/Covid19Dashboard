import Loader from 'react-loader-spinner'
import './index.css'

const Loading = () => (
  <div className="loader-design">
    <Loader type="Oval" color="#007BFF" height={50} width={50} />
  </div>
)

export default Loading
