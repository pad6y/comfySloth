import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const prices = action.payload.map((product) => product.price);
    const maxPrice = Math.max(...prices);

    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  //set view type
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  //set sort by
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filteredProducts } = state;
    let sortedArray = [...filteredProducts];

    if (sort === 'price-lowest') {
      sortedArray = sortedArray.sort(function (a, b) {
        return a.price - b.price;
      });
    }
    if (sort === 'price-highest') {
      sortedArray = sortedArray.sort(function (a, b) {
        return b.price - a.price;
      });
    }
    if (sort === 'name-a') {
      sortedArray = sortedArray.sort(function (a, b) {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) return -1;
        if (x > y) return 1;

        return 0;
        //Oneliner
        // return a.name.localeCompare(b.name);
      });
    }
    if (sort === 'name-z') {
      sortedArray = sortedArray.sort(function (a, b) {
        let x = b.name.toLowerCase();
        let y = a.name.toLowerCase();
        if (x < y) return -1;
        if (x > y) return 1;

        return 0;
      });
    }

    return { ...state, filteredProducts: sortedArray };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: { ...state.filters, [name]: value },
    };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state;
    const { text, category, company, color, price, shipping } = state.filters;

    let tempArray = [...allProducts];

    if (text) {
      tempArray = tempArray.filter((product) =>
        product.name.toLowerCase().includes(text)
      );
    }
    if (category !== 'all') {
      tempArray = tempArray.filter((product) => product.category === category);
    }
    if (company !== 'all') {
      tempArray = tempArray.filter((product) => product.company === company);
    }
    if (color !== 'all') {
      tempArray = tempArray.filter((product) => product.colors.includes(color));
    }
    if (price) {
      tempArray = tempArray.filter((product) => product.price <= price);
    }
    if (shipping) {
      tempArray = tempArray.filter((product) => product.shipping);
    }

    return { ...state, filteredProducts: tempArray };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
