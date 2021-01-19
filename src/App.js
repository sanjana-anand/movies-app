import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Movies from './components/Movies/Movies';
import Layout from './components/Layout/Layout';

function App() {
  return (
      <Layout>
        <Switch>
          <Route path="/all" component={Movies} />
          <Route path="/favorites" component={Movies} />
          <Redirect from="/" to="/all" />
        </Switch>
      </Layout>
  );
}

export default App;
