import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: #1c1d1f;
	padding: 3.2rem;
	color: white;
	height: calc(100vh - 72px);
	width: 100%;
`;

const ErrorInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 10px;
`;

const NotFoundMsg = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

export default { Container, ErrorInfo, NotFoundMsg };
