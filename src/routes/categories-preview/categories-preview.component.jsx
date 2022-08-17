import React, { useContext, Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategoryMap } from "../../store/categories/category.selector";
import { useSelector } from "react-redux";

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoryMap);

	return (
		<Fragment>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];
				return (
					<CategoryPreview key={title} title={title} products={products} />
				);
			})}
		</Fragment>
	);
};

export default CategoriesPreview;
