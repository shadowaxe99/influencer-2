import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ProfileManagement from './pages/ProfileManagement'
function App() {
return (
<Router>
<Switch>
<Route exact path='/' component={Dashboard} />
<Route path='/profile' component={ProfileManagement} />
</Switch>
</Router>
)
}
export default App