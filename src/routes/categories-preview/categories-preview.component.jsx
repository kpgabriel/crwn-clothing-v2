import React, { useContext, Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategoryMap } from "../../store/categories/category.selector";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";
import { selectCategoriesIsLoading } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoryMap);
	const isLoading = useSelector(selectCategoriesIsLoading);
	return (
		<Fragment>
			{isLoading ? (
				<Spinner />
			) : (
				Object.keys(categoriesMap).map((title) => {
					const products = categoriesMap[title];
					return (
						<CategoryPreview key={title} title={title} products={products} />
					);
				})
			)}
		</Fragment>
	);
};

export default CategoriesPreview;
