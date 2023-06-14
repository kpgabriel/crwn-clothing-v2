import { useNavigate } from 'react-router-dom';

import {
	BackgroundImage,
	Body,
	DirectoryItemContainer,
} from './directory-item.styles';

type CategoryRouteProps = {
	imageUrl: string;
	title: string;
	route: string;
};

type DirectoryItemProps = {
	category: CategoryRouteProps;
};

const DirectoryItem = ({ category }: DirectoryItemProps) => {
	const { imageUrl, title, route } = category;
	const navigate = useNavigate();

	const onNavigateHandler = () => navigate(route);

	return (
		<DirectoryItemContainer onClick={onNavigateHandler}>
			<BackgroundImage imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
