import React, { FC, useEffect, useMemo, useState } from 'react';
import { fetchDevices } from '../store/reducers/data/FetchActionCreators';
import { useTypedSelector } from '../hooks/redux';
import { useAppDispatch } from '../hooks/redux';
import DeviceList from './DeviceList';
import { Pagination } from 'react-bootstrap';
import '../styles/list.css';

const StoreList: FC = () => {
  const { devices, chosenBrand, chosenType, search } = useTypedSelector(
    (state) => ({
      ...state.deviceReducer,
      ...state.brandReducer,
      ...state.typeReducer,
    })
  );
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const pagesCount = useMemo(() => {
    return Math.ceil(devices.count / limit);
  }, [devices.count, limit]);
  const dispatch = useAppDispatch();
  const items = useMemo(() => {
    const items = [];
    for (let i = 1; i <= pagesCount; i++) {
      items.push(
        <Pagination.Item key={i} active={page === i} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>
      );
    }
    return items;
  }, [pagesCount, page]);
  useEffect(() => {
    dispatch(fetchDevices(limit, page, chosenType, chosenBrand, search));
  }, [chosenType, chosenBrand, page, search, dispatch, limit]);
  return (
    <div className="list__container">
      <DeviceList devices={devices.rows} />
      <div className="pagination">
        <Pagination>{items}</Pagination>
      </div>
    </div>
  );
};
export default StoreList;
