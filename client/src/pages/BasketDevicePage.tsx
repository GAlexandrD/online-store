import { useNavigate } from 'react-router-dom';
import DeviceInfo from '../components/DeviceInfo';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import '../styles/DevicePage.css';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { chooseDevice } from '../store/reducers/data/DeviceState';
import { deleteFromBasket, fetchBasket } from '../store/reducers/user/BasketActions';

function BasketDevicePage() {
  const { chosenDevice } = useTypedSelector((state) => state.deviceReducer);
  const userId = useTypedSelector((state) => state.userReducer.id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!chosenDevice) {
      navigate('/basket');
    }
  }, [chosenDevice]);

  const close = () => {
    dispatch(chooseDevice(null));
    navigate('/basket');
  };
  const deleteDevice = () => {
    if (userId && chosenDevice) {
      dispatch(deleteFromBasket(userId, chosenDevice.id));
      dispatch(fetchBasket(userId));
      navigate('/basket');
    }
  };
  return (
    <div className="devicePage__container">
      {chosenDevice ? (
        <>
          <div className="devicePage_content">
            <Button
              className="close_devicePage"
              size="lg"
              variant="close"
              onClick={close}
            ></Button>
            <DeviceInfo device={chosenDevice} />
          </div>
          <div className="devicePage__footer">
            <Button
              className="addToBasket"
              size="lg"
              variant="success"
              onClick={deleteDevice}
            >
              Remove from basket
            </Button>
          </div>
        </>
      ) : (
        <div>Device is not chosen</div>
      )}
    </div>
  );
}

export default BasketDevicePage;
