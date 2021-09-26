import { Switch, Route, Redirect } from 'react-router-dom';
import Countries from 'pages/Countries';

const Home = () => (
	<Switch>
		<Route path="/countries" component={Countries} />
		<Route exact path="/" render={() => <Redirect to="/countries" />} />
	</Switch>
);

export default Home;
