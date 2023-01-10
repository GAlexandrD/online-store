import React, { FC } from 'react';
import Device from './Device';
import { DeviceModel } from '../types/types';

interface deviceListProps {
  devices: DeviceModel[];
}

const DeviceList: FC<deviceListProps> = ({ devices }) => {
  if (!devices) return <></>;
  return (
    <div className="deviceList__container">
      {devices.map((device: DeviceModel) => (
        <Device key={device.id} device={device} />
      ))}
    </div>
  );
};
export default DeviceList;
