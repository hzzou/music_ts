import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { Suspense } from 'react';

import Loading from '../common/Loading/Loading';
import NotFound from '../common/NotFound/NotFound';
import Home from '../pages/Home/Home';

const Routes = ()=>{
  return(
    <div className="app" style={{ width: "100%", height: "100%" }}>
      <Suspense fallback={Loading}>
        <Router>
          <Switch>
            <Route path={'/404'} component={NotFound} />
            <Route path={'/'} component={Home} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  )
}

export default Routes;