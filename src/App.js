import {Switch, BrowserRouter, Route} from 'react-router-dom'
import Home from './components/Home'
import StateWise from './components/StateWise'
import About from './components/About'

import './App.css'
import NotFound from './components/NotFound'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route path="/state/:stateCode" component={StateWise} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
