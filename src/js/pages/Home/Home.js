import { Switch, Route, Redirect } from 'react-router-dom';
import Countries from 'pages/Countries';
import Country from 'pages/Country';
import NotFound from 'pages/NotFound';

const Home = () => (
	<Switch>
		<Route path="/countries" component={Countries} />
		<Route path="/country/:id" component={Country} />
		<Route path="/404" component={NotFound} />
		<Route exact path="/" render={() => <Redirect to="/countries" />} />
		<Route render={() => <Redirect to="/404" />} />
	</Switch>
);

export default Home;
