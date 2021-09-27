import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_COUNTRIES, GET_CONTINENTS } from '../../../apollo/queries/queries';

const Countries = () => {
	const [search, setSearch] = useState('');
	const [currencyFilter, setCurrencyFilter] = useState([]);
	const [continentsFilter, setContinentFilter] = useState('');

	const {
		loading: getCountriesLoading,
		error: getCountriesError,
		data: getCountriesData,
	} = useQuery(GET_COUNTRIES);

	const {
		data: getContinentsData,
		error: getContinentsError,
		loading: getContinentsLoading,
	} = useQuery(GET_CONTINENTS);

	if (getContinentsLoading || getCountriesLoading) return <p>Loading...</p>;
	if (getCountriesError || getContinentsError) return <p>Error</p>;

	const { countries } = getCountriesData || {};

	const renderCountries =
		countries &&
		countries
			.filter(country => country.name.toLowerCase().startsWith(search.toLowerCase()))
			.filter(country => {
				if (!currencyFilter.length) return country;
				const { currency: countryCurrency } = country;
				if (countryCurrency && countryCurrency.includes(',')) {
					const currencyArr = countryCurrency.split(',');
					return currencyFilter.find(currency => currencyArr.includes(currency));
				}
				return currencyFilter.find(currency => currency === country.currency);
			})
			.filter(country => {
				const {
					continent: { name: continentName },
				} = country;
				if (!continentsFilter.length) return country;
				return continentsFilter.find(continent => continent === continentName);
			})
			.map(country => {
				const {
					name,
					continent: { name: continentName },
					currency,
					emoji,
				} = country;

				const id = name.toLowerCase().replaceAll(' ', '-');

				return (
					<li key={id} className={`country-card--${id}`}>
						<Link to={`/country/${id}`}>
							<p>{emoji}</p>
							<div>
								<h2>{name}</h2>
								<h3>{continentName}</h3>
								<h4>{currency}</h4>
							</div>
						</Link>
					</li>
				);
			});

	const { continents } = getContinentsData || {};

	const renderContinents =
		continents &&
		continents.map(continent => {
			const { name: continentName, code } = continent;

			return (
				<label htmlFor={code} key={code}>
					<input
						type="checkbox"
						id={code}
						name="continent"
						onChange={e => {
							if (e.target.checked) return setContinentFilter([...continentsFilter, continentName]);
							const popFromFilters = continentsFilter.filter(c => c !== continentName);
							return setContinentFilter(popFromFilters);
						}}
					/>
					{continentName}
					<span>(numero de paises por continente)</span>
				</label>
			);
		});

	const currencies =
		countries &&
		countries
			.reduce((accum, current) => {
				const { currency } = current;
				if (currency && currency.includes(',')) {
					const currencyArr = currency.split(',');
					return [...accum, ...currencyArr];
				}
				return accum.includes(currency) ? [...accum] : [...accum, currency];
			}, [])
			.filter((value, i, arr) => arr.indexOf(value) === i);

	const renderCurrencyFilter =
		currencies &&
		currencies.map(currency => (
			<label htmlFor={currency} key={currency}>
				<input
					type="checkbox"
					id={currency}
					name="currency"
					onChange={e => {
						if (e.target.checked) return setCurrencyFilter([...currencyFilter, currency]);
						const popFromFilters = currencyFilter.filter(c => c !== currency);
						return setCurrencyFilter(popFromFilters);
					}}
				/>
				{currency}
			</label>
		));

	return (
		<>
			<input
				type="search"
				name="search"
				placeholder="Search"
				onChange={e => setSearch(e.target.value)}
				value={search}
			/>
			<div>Currency filter</div>
			<div role="group">{renderCurrencyFilter}</div>
			<div>Continents</div>
			<div role="group">{renderContinents}</div>
			<div>Countries</div>
			<section>
				{renderCountries.length ? <ul>{renderCountries}</ul> : <div>Ups! Country not found</div>}
			</section>
		</>
	);
};

export default Countries;
