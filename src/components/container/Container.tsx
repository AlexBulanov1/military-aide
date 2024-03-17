import styles from './Container.module.scss';

type ContainerProps = {
	style?: React.CSSProperties;
	children: React.ReactNode;
};

const Container = ({ children, style }: ContainerProps) => {
	return (
		<div style={style} className={styles.container}>
			{children}
		</div>
	);
};

export default Container;
