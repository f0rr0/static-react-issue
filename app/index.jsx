import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Router, Route, browserHistory,
  IndexRoute, Link, createMemoryHistory, match, RoutingContext } from 'react-router';

const createElement = (Component, props) => <Component key={new Date().getTime()} {...props} />;

const App = ({ children }) => <div className="app">{children}</div>;
const About = () => <div>About</div>;
const Home = () => {
  return (
    <main>
      <div>
        <p>Stuff</p>
        <Link to="/about">Click</Link>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
    </main>
  );
};

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />
  </Route>
);

const run = () => {
  ReactDOM.render(
    <Router history={browserHistory} routes={routes} createElement={createElement} />,
    document.getElementById('root')
  );
};

const loadedStates = ['complete', 'loaded', 'interactive'];

if (typeof document !== 'undefined') {
  if (loadedStates.includes(document.readyState) && document.body) {
    run();
  } else {
    window.addEventListener('DOMContentLoaded', run, false);
  }
}

export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
      callback(null, `<html id="root">${renderToString(<RoutingContext {...renderProps} />)}</html>`);
    }
  );
};
