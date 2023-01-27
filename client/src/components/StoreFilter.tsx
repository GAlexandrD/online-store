import React, { useEffect } from 'react';
import { FC } from 'react';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import { fetchBrands, fetchTypes } from '../store/reducers/data/FetchActionCreators';
import '../styles/filters.css';
import Form from 'react-bootstrap/Form';
import { chooseBrand } from '../store/reducers/data/BrandState';
import { chooseType } from '../store/reducers/data/TypeState';
import { setSearch } from '../store/reducers/data/DeviceState';

const StoreFilter: FC = () => {
  const { brands, types, chosenBrand, chosenType, search } = useTypedSelector(
    (store) => ({
      ...store.brandReducer,
      ...store.typeReducer,
      ...store.deviceReducer,
    })
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchTypes());
  }, [dispatch]);
  return (
    <div className="filters">
      <div className="search">
        <Form.Control
          aria-label="name"
          placeholder="Search"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </div>
      <div className="filterItem">
        <Form.Select
          className="filters__select filters__select_brands"
          onChange={(e) => dispatch(chooseBrand(e.target.value))}
          value={chosenBrand}
        >
          <option value={''}>ALL Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </Form.Select>
      </div>
      <div className="filterItem">
        <Form.Select
          className="filters__select filters__select_types"
          onChange={(e) => dispatch(chooseType(e.target.value))}
          value={chosenType}
        >
          <option value={''}>ALL Types</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </Form.Select>
      </div>
    </div>
  );
};

export default StoreFilter;
