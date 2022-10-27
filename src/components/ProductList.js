import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { filteredProducts, grid_view } = useFilterContext();

  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    );
  }

  return (
    <>
      {grid_view && <GridView products={filteredProducts} />}
      {!grid_view && <ListView products={filteredProducts} />}
    </>
  );
};
export default ProductList;
