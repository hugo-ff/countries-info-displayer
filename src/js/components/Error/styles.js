import styled from 'styled-components';

const ErrorWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
`;

const ErrorInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 10px;
`;

export default { ErrorWrapper, Container, ErrorInfo };
