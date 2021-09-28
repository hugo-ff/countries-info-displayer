import styled from 'styled-components';

const CountriesWrapper = styled.div`
	display: flex;
	justify-content: center;
	background-color: #1c1d1f;
	padding: 3.2rem;
	color: white;
	min-height: calc(100vh - 72px);
	height: auto;
	width: 100%;
`;

const FiltersContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 40px;
	width: 100%;
	max-width: 240px;
`;

const FilterIcon = styled.span`
	width: 20px;
	height: 20px;
	margin-right: 8px;
	background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='matrix(1, 0, 0, 1, 0, -7.01206)'%3E%3Cg%3E%3Cpath d='M 500 22.82 L 0 22.82 L 186.281 221.34 L 186.267 484.083 L 313.734 417.385 L 313.72 221.34 L 500 22.82 Z M 205.258 452.518 L 205.272 213.676 L 44.213 42.031 L 455.786 42.031 L 294.728 213.676 L 294.742 405.696 L 205.258 452.518 Z' style='fill: rgb(255, 255, 255);'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	max-width: 1280px;
`;

const FiltersTitle = styled.p`
	display: flex;
	align-items: center;
	font-weight: 400;
	letter-spacing: 0.5px;
	font-size: 24px;
	margin-bottom: 10px;
`;

const CountriesContainer = styled.section`
	flex-grow: 1;
`;

const NotFoundMsg = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

export default {
	CountriesWrapper,
	FiltersContainer,
	Container,
	FilterIcon,
	FiltersTitle,
	CountriesContainer,
	NotFoundMsg,
};
