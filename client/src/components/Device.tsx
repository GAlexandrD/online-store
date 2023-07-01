import React, { FC } from 'react';
import { DeviceModel } from '../types/types';
import '../styles/device.css';
import { useAppDispatch } from '../hooks/redux';
import { chooseDevice } from '../store/reducers/data/DeviceState';
import { useLocation, useNavigate } from 'react-router-dom';

interface DeviceProps {
  device: DeviceModel;
}
const Device: FC<DeviceProps> = ({ device }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const showInfo = () => {
   dispatch(chooseDevice(device));
   if(location.pathname !== '/'){
    navigate(`${location.pathname}/device-info`);
   } else navigate(`/device-info`);
  }
  return (
    <div className="device" onClick={showInfo}>
      <div className="img__container"><img
        className="device__picture"
        src={device.img ? `http://localhost:5000/${device.img}`: './img/noimage.jpg'}
        alt="*"
        onMouseDown={(e) => e.preventDefault()}
      /></div>
      <div className='device__name'>{device.name}</div>
      <div className='device__price'>{device.price}$</div>
    </div>
  );
};
export default Device;
