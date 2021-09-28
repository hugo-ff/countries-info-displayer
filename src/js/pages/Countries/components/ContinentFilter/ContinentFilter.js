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
} from '@chakra-ui/react';
import validateArray from 'utils';
import { GET_CONTINENTS } from '../../../../../apollo/queries/queries';

const ContinentFilter = ({ continentFilter, setContinentFilter }) => {
	const { data } = useQuery(GET_CONTINENTS);
	const { continents } = data || {};

	const renderContinents =
		validateArray(continents) &&
		continents.map(continent => {
			const { name: continentName, code } = continent;

			return (
				<Checkbox
					key={code}
					htmlFor={code}
					id={code}
					name="continent"
					onChange={e => {
						if (e.target.checked) return setContinentFilter([...continentFilter, continentName]);
						const popFromFilters =
							validateArray(continentFilter) && continentFilter.filter(c => c !== continentName);
						return setContinentFilter(popFromFilters);
					}}
					style={{ marginTop: '5px', marginBottom: '5px' }}
				>
					{continentName}
				</Checkbox>
			);
		});
	return (
		<Accordion allowToggle size="100px">
			<AccordionItem>
				<AccordionButton style={{ padding: '16px' }}>
					<Box
						flex="1"
						textAlign="left"
						style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '0.5px' }}
					>
						Continent
					</Box>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel pb={4}>
					<CheckboxGroup colorScheme="green">
						<Stack>{renderContinents}</Stack>
					</CheckboxGroup>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};

ContinentFilter.propTypes = {
	continentFilter: arrayOf(string),
	setContinentFilter: func,
};

ContinentFilter.defaultProps = {
	continentFilter: [],
	setContinentFilter: () => {},
};

export default ContinentFilter;
