import { useNavigate, useParams } from 'react-router-dom';
import DeviceInfo from '../components/DeviceInfo';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import '../styles/DevicePage.css';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { chooseDevice } from '../store/reducers/data/DeviceState';
import { addToBasket, fetchBasket } from '../store/reducers/user/BasketActions';

function DevicePage() {
  const dispatch = useAppDispatch();
  const { chosenDevice } = useTypedSelector((state) => state.deviceReducer);
  const { id, isAuth } = useTypedSelector((state) => state.userReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (!chosenDevice) {
      navigate('/');
    }
  }, [chosenDevice]);

  const close = () => {
    dispatch(chooseDevice(null));
    navigate('/');
  };

  const addDevice = () => {
    if (chosenDevice && id) {
      dispatch(addToBasket(id, chosenDevice.id));
      dispatch(fetchBasket(id));
      navigate('/');
    }
  };
  return (
    <div>
      {chosenDevice ? (
        <div className="devicePage__container">
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
            {isAuth && (
              <Button
                className="addToBasket"
                size="lg"
                variant="success"
                onClick={addDevice}
              >
                Add to Busket
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>Device is not chosen</div>
      )}
    </div>
  );
}

export default DevicePage;
