import { useState } from 'react';
import { arrayOf, func, string } from 'prop-types';
import { useQuery } from '@apollo/client';
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Checkbox,
	CheckboxGroup,
	Stack,
	Collapse,
	Button,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import validateArray from 'utils';
import { GET_COUNTRIES } from '../../../../../apollo/queries/queries';

const CurrencyFilter = ({ currencyFilter, setCurrencyFilter }) => {
	const [show, setShow] = useState(false);
	const handleToggle = () => setShow(!show);

	const { data } = useQuery(GET_COUNTRIES);
	const { countries } = data || {};

	const currencies =
		validateArray(countries) &&
		countries
			.reduce((accum, current) => {
				const { currency } = current;
				if (!currency) return [...accum];
				if (currency && currency.includes(',')) {
					const currencyArr = currency.split(',');
					return [...accum, ...currencyArr];
				}
				return accum.includes(currency) ? [...accum] : [...accum, currency];
			}, [])
			.filter((value, i, arr) => arr.indexOf(value) === i);

	const renderCurrencyFilter =
		validateArray(currencies) &&
		currencies.map(currency => (
			<Checkbox
				key={currency}
				htmlFor={currency}
				id={currency}
				name="currency"
				onChange={e => {
					if (e.target.checked) return setCurrencyFilter([...currencyFilter, currency]);
					const popFromFilters =
						validateArray(currencyFilter) && currencyFilter.filter(c => c !== currency);
					return setCurrencyFilter(popFromFilters);
				}}
				style={{ marginTop: '5px', marginBottom: '5px' }}
			>
				{currency}
			</Checkbox>
		));

	return (
		<Accordion allowToggle defaultIndex={0}>
			<AccordionItem style={{ borderBottom: '0px' }}>
				<AccordionButton style={{ padding: '16px' }}>
					<Box
						flex="1"
						textAlign="left"
						style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '0.5px' }}
					>
						Currency
					</Box>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel pb={4}>
					<Collapse startingHeight={195} in={show}>
						<CheckboxGroup colorScheme="green">
							<Stack
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(3, 1fr)',
								}}
							>
								{renderCurrencyFilter}
							</Stack>
						</CheckboxGroup>
					</Collapse>
					<Button
						size="sm"
						onClick={handleToggle}
						mt="1rem"
						variant="link"
						colorScheme="teal"
						style={{ textDecoration: 'none' }}
					>
						Show {show ? 'Less' : 'More'}{' '}
						{show ? <ChevronUpIcon w={5} h={5} /> : <ChevronDownIcon w={5} h={5} />}
					</Button>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};

CurrencyFilter.propTypes = {
	currencyFilter: arrayOf(string),
	setCurrencyFilter: func,
};

CurrencyFilter.defaultProps = {
	currencyFilter: [],
	setCurrencyFilter: () => {},
};

export default CurrencyFilter;
