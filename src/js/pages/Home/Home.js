import { Switch, Route, Redirect } from 'react-router-dom';
import Countries from 'pages/Countries';
import Country from 'pages/Country';

const Home = () => (
	<Switch>
		<Route path="/countries" component={Countries} />
		<Route path="/country/:id" component={Country} />
		<Route exact path="/" render={() => <Redirect to="/countries" />} />
	</Switch>
);

export default Home;
