import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import { Alert, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { authorisation } from '../store/reducers/AuthActionCreator';
import { removeError, removePayload } from '../store/reducers/AdminState';
import '../styles/AdminPannel.css';
import DeviceForm from '../components/DeviceForm';
import BrandForm from '../components/BrandForm';
import TypeForm from '../components/TypeForm';
import RemoveForm from '../components/RemoveForm';

type removeType = 'device' | 'brand' | 'type'; 

function AdminPannel() {
  const SHOW_RESPONSE_DELAY = 1500;
  const { isAuth } = useTypedSelector((state) => state.userReducer);
  const { payload, error } = useTypedSelector((state) => state.adminReducer);
  const [isShowPayload, setIsShowPayload] = useState(false);
  const [isShowError, setIsShowError] = useState(false);
  const [isShowDeviceModal, setDeviceModalShow] = useState(false);
  const [isShowBrand, setBrandShow] = useState(false);
  const [isShowType, setTypeShow] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [removeType, setRemoveType] = useState<removeType>('device');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authorisation());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      setIsShowError(true);
      setTimeout(() => {
        setIsShowError(false);
        dispatch(removeError());
      }, SHOW_RESPONSE_DELAY);
    }
    if (payload) {
      setIsShowPayload(true);
      setTimeout(() => {
        setIsShowPayload(false);
        dispatch(removePayload());
      }, SHOW_RESPONSE_DELAY);
    }
  }, [payload, error]);
  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);
  const showRemoveModal = (type: removeType) => () => {
    setRemoveType(type);
    setIsRemove(true);
  };
  return (
    <div className="adminPannel__container">
      <div className="adminPannel__content">
        {isShowDeviceModal && (
          <DeviceForm close={() => setDeviceModalShow(false)} />
        )}
        {isShowBrand && <BrandForm close={() => setBrandShow(false)} />}
        {isShowType && <TypeForm close={() => setTypeShow(false)} />}
        {isRemove && (
          <RemoveForm close={() => setIsRemove(false)} type={removeType} />
        )}
        <div className="brands__control">
          <span className="adminPannel__name">Brands</span>
          <Button
            variant="info"
            className="adminPannel__button"
            onClick={() => setBrandShow(true)}
          >
            Add brand
          </Button>
          <Button
            variant="danger"
            className="adminPannel__button"
            onClick={showRemoveModal('brand')}
          >
            Remove brand
          </Button>
        </div>
        <div className="devices__control">
          <span className="adminPannel__name">Devices</span>
          <Button
            variant="info"
            className="adminPannel__button"
            onClick={() => setDeviceModalShow(true)}
          >
            Add device
          </Button>
          <Button
            variant="danger"
            className="adminPannel__button"
            onClick={showRemoveModal('device')}
          >
            Remove device
          </Button>
        </div>
        <div className="types__control">
          <span className="adminPannel__name">Types</span>

          <Button
            variant="info"
            className="adminPannel__button"
            onClick={() => setTypeShow(true)}
          >
            Add type
          </Button>
          <Button
            variant="danger"
            className="adminPannel__button"
            onClick={showRemoveModal('type')}
          >
            Remove type
          </Button>
        </div>
        {isShowPayload && (
          <Alert className={'my-app-alert'} variant="success">
            success
          </Alert>
        )}
        {isShowError && (
          <Alert className={'my-app-alert'} variant="danger">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default AdminPannel;
