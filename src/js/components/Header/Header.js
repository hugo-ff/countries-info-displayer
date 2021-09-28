import { useMemo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { func } from 'prop-types';
import { useQuery } from '@apollo/client';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { setSearch } from '../../redux/search/actions';
import { GET_COUNTRIES } from '../../../apollo/queries/queries';
import styles from './styles';

const Header = ({ setSearchQuery }) => {
	const [submitSearch, setSubmitSearch] = useState('');
	const history = useHistory();
	const { data } = useQuery(GET_COUNTRIES);
	const { countries } = data || {};

	const handleChange = e => setSearchQuery(e.target.value);
	const debouncedChangeHandler = useMemo(() => debounce(handleChange, 300), []);

	useEffect(() => {
		if (!submitSearch) return false;
		const { code } =
			countries.find(country => country.name.toLowerCase() === submitSearch.toLowerCase()) || {};
		if (!code) return history.replace(`/404`);
		return history.replace(`/country/${code.toLowerCase()}`);
	}, [submitSearch]);

	const handleOnKeyPress = e => {
		if (e.code !== 'Enter') return;
		setSubmitSearch(e.target.value);
	};

	useEffect(() => {
		return () => {
			debouncedChangeHandler.cancel();
		};
	}, []);

	return (
		<styles.Header>
			<InputGroup style={{ width: '70%' }}>
				<InputLeftElement pointerEvents="none">
					<SearchIcon color="#212121" w={4} h={4} style={{ marginTop: '6px', marginLeft: '4px' }} />
				</InputLeftElement>
				<Input
					type="search"
					name="search"
					placeholder="Search a country"
					onChange={debouncedChangeHandler}
					onKeyPress={handleOnKeyPress}
					size="lg"
					style={{ borderRadius: '20px', borderColor: '#212121', fontSize: '14px' }}
				/>
			</InputGroup>
		</styles.Header>
	);
};

Header.propTypes = {
	setSearchQuery: func,
};

Header.defaultProps = {
	setSearchQuery: () => {},
};

const mapDispatchToProps = dispatch => ({
	setSearchQuery(search) {
		dispatch(setSearch(search));
	},
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
