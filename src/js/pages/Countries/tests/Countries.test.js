// import { render, screen } from 'src/test-utils/testing-library';
import { render, screen, userEvent } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import client from 'src/apollo/client';
import Countries from '../Countries';

describe('displays data from the server', () => {
	beforeEach(() => {
		render(
			<ApolloProvider client={client}>
				<Countries />
			</ApolloProvider>
		);
	});

	test('displays country data without error', async () => {
		const countries = await screen.findAllByRole('listitem', { className: /country/i });
		expect(countries).toHaveLength(5);

		const countriesItems = countries.map(listitem => listitem.className);
		expect(countriesItems).toEqual([
			'country-card--andorra',
			'country-card--united-arab-emirates',
			'country-card--afghanistan',
			'country-card--antigua-and-barbuda',
			'country-card--anguilla',
		]);
	});

	test('displays continents checkboxes without error', async () => {
		const continents = await screen.findAllByRole('checkbox', {
			name: /(africa|antarctica|asia|europe|north america|oceania|south america)/i,
		});
		const continentsCode = continents.map(continent => continent.id);
		expect(continentsCode).toEqual(['AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA']);
	});

	test('initial conditions for continents checkbox filter', async () => {
		const africaCheckbox = await screen.findByRole('checkbox', { name: /africa/i });
		expect(africaCheckbox).not.toBeChecked();

		const antarcticaCheckbox = await screen.findByRole('checkbox', { name: /antarctica/i });
		expect(antarcticaCheckbox).not.toBeChecked();

		const asiaCheckbox = await screen.findByRole('checkbox', { name: /asia/i });
		expect(asiaCheckbox).not.toBeChecked();

		const europeCheckbox = await screen.findByRole('checkbox', { name: /europe/i });
		expect(europeCheckbox).not.toBeChecked();

		const northAmericaCheckbox = await screen.findByRole('checkbox', { name: /north america/i });
		expect(northAmericaCheckbox).not.toBeChecked();

		const southAmericaCheckbox = await screen.findByRole('checkbox', { name: /south america/i });
		expect(southAmericaCheckbox).not.toBeChecked();

		const oceaniaCheckbox = await screen.findByRole('checkbox', { name: /oceania/i });
		expect(oceaniaCheckbox).not.toBeChecked();
	});

	test('initial conditions for currency checkbox filter', async () => {
		const africaCheckbox = await screen.findByRole('checkbox', { name: 'EUR' });
		expect(africaCheckbox).not.toBeChecked();

		const antarcticaCheckbox = await screen.findByRole('checkbox', { name: /AED/i });
		expect(antarcticaCheckbox).not.toBeChecked();

		const asiaCheckbox = await screen.findByRole('checkbox', { name: /AFN/i });
		expect(asiaCheckbox).not.toBeChecked();

		const europeCheckbox = await screen.findByRole('checkbox', { name: /XCD/i });
		expect(europeCheckbox).not.toBeChecked();
	});
});

describe('searchbar', () => {
	beforeEach(() => {
		<ApolloProvider client={client}>
			<Countries />
		</ApolloProvider>;
	});

	test('initial condition for search input', () => {
		const searchInput = screen.getByRole('searchbox', { title: 'Search' });
		expect(searchInput).not.toHaveTextContent();
	});

	test('find a country by its name and filter from the countries list', async () => {
		const countries = await screen.findAllByRole('listitem', { className: /country/i });
		expect(countries).toHaveLength(5);

		const countriesItems = countries.map(listitem => listitem.textContent);
		expect(countriesItems).toEqual([
			/andorra/i,
			/united arab emirates/i,
			/afghanistan/i,
			/antigua and barbuda/i,
			/anguilla/i,
		]);

		const searchInput = screen.getByRole('searchbox', { title: 'Search' });
		userEvent.clear(searchInput);
		userEvent.type(searchInput, 'Andorra');
		expect(countriesItems).toEqual(['Andorra']);

		userEvent.clear(searchInput);
		expect(countriesItems).toEqual([
			/andorra/i,
			/united arab emirates/i,
			/afghanistan/i,
			/antigua and barbuda/i,
			/anguilla/i,
		]);

		userEvent.type(searchInput, 'Afghanistan');
		expect(countriesItems).toEqual(['Afghanistan']);
	});

	test('type a wrong random word and get Not Found message', async () => {
		const countries = await screen.findAllByRole('listitem', { className: /country/i });
		expect(countries).toHaveLength(5);

		const countriesItems = countries.map(listitem => listitem.textContent);
		expect(countriesItems).toEqual([
			/andorra/i,
			/united arab emirates/i,
			/afghanistan/i,
			/antigua and barbuda/i,
			/anguilla/i,
		]);

		const searchInput = screen.getByRole('searchbox', { title: 'Search' });
		userEvent.clear(searchInput);
		userEvent.type(searchInput, 'asdasdasda');

		expect(countriesItems).not.toHaveLength();

		const errorMessage = screen.queryByText(/no country with that name was found/i);
		expect(errorMessage).toBeInTheDocument();
	});

	test('type a letter that matches several countries', async () => {
		const countries = await screen.findAllByRole('listitem', { className: /country/i });
		expect(countries).toHaveLength(5);

		const countriesItems = countries.map(listitem => listitem.textContent);
		expect(countriesItems).toEqual([
			/andorra/i,
			/united arab emirates/i,
			/afghanistan/i,
			/antigua and barbuda/i,
			/anguilla/i,
		]);

		const searchInput = screen.getByRole('searchbox', { title: 'Search' });
		userEvent.clear(searchInput);
		userEvent.type(searchInput, 'an');

		expect(countriesItems).toEqual([/andorra/i, /antigua and barbuda/i, /anguilla/i]);
	});
});
