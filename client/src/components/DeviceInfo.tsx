import React, { FC } from 'react';
import { DeviceModel } from '../types/types';
import '../styles/deviceInfo.css';
import { ListGroup } from 'react-bootstrap';

interface DeviceInfoProps {
  device: DeviceModel;
}

const DeviceInfo: FC<DeviceInfoProps> = ({ device }) => (
  <div className="deviceInfo__container">
    <img
      className="deviceInfo__picture"
      src={device.img ? `http://localhost:5000/${device.img}`: './img/noimage.jpg'}
      alt=""
      onMouseDown={(e) => e.preventDefault()}
    />
    <div className="info">
      <div className="deviceInfo_header">
        <span className="name">{device.name}</span>
        <span className="price">{device.price}$</span>
      </div>
      <ListGroup variant="flush">
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Brand</div>
            {device.brands.name}
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Type</div>
            {device.types.name}
          </div>
        </ListGroup.Item>
        {device.device_infos?.map((char) => (
          <ListGroup.Item
            key={char.title}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{char.title}</div>
              {char.description}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  </div>
);

export default DeviceInfo;
