import { Spinner } from '@chakra-ui/react';
import styles from './styles';

const Loading = () => (
	<styles.LoadingWrapper>
		<Spinner size="xl" />
	</styles.LoadingWrapper>
);

export default Loading;
