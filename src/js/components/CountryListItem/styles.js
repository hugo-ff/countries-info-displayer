import styled from 'styled-components';

const CountryInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 10px;
	padding-top: 10px;
	border-top: 1px solid #333;
`;

const CountryFlag = styled.span`
	font-size: 20px;
`;

const InfoKey = styled.p`
	font-size: 14px;
	font-weight: 600;
	text-transform: capitalize;
	margin: 4px 0;
`;

const InfoValue = styled.span`
	font-weight: 400;
`;

export default { CountryInfoContainer, CountryFlag, InfoKey, InfoValue };
