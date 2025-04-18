import { notFound } from 'next/navigation';
import { ICategoryResponse } from 'types/schema/product.shema';
import getCategory from '@/app/(server)/actions/category/get-category.controller';
import SubcategoryForm from './sub-category-form';
import getCategories from '@/app/(server)/actions/category/get-categories.controller';

interface ISubcategoryViewPageProps {
  subCategoryId: string;
}

export default async function SubcategoryViewPage({
  subCategoryId
}: ISubcategoryViewPageProps) {
  let category: ICategoryResponse | undefined;
  let pageTitle = 'Create New Subcategory';

  const categories = await getCategories();

  if (subCategoryId !== 'new') {
    const data = await getCategory(subCategoryId, {
      getSubcategories: true
    });
    // product = data.product as Product;
    if (!data.ok) {
      console.error(
        '[SubCategoryViewPage] Failed to get sub-category >',
        data.error
      );
      notFound();
    }

    pageTitle = `Edit Subcategory`;
    category = data.data;
  }

  return (
    <SubcategoryForm
      initialData={category?.payload}
      pageTitle={pageTitle}
      categories={categories.ok ? categories.data.payload : []}
    />
  );
}
