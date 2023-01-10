import React, { FC, useState } from 'react';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import MyModal from './UI/MyModal/MyModal';
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import '../styles/deviceForm.css';
import { addDevice } from '../store/reducers/AdminActionCreators';

interface DeviceProps {
  close: Function;
}

interface CharacteristicModel {
  title: string;
  description: string;
}

const DeviceForm: FC<DeviceProps> = ({ close }) => {
  const dispatch = useAppDispatch();
  const { brands, types } = useTypedSelector((store) => ({
    ...store.brandReducer,
    ...store.typeReducer,
  }));
  const [charName, setCharName] = useState('');
  const [charDisc, setCharDisc] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [device_infos, setDevice_infos] = useState([] as CharacteristicModel[]);
  const [file, setFile] = useState(null);
  const add = () => {
    const priceArg = price ? +price : 0;
    if (typeof priceArg !== 'number') return;
    if (file !== null) {
      dispatch(
        addDevice({
          brand,
          type,
          name,
          price: priceArg,
          device_infos,
          img: file,
        })
      );
    } else
      dispatch(addDevice({ brand, type, name, price: priceArg, device_infos }));
    close();
  };

  const setFileEvent = (e: any) => {
    setFile(e.target.files[0]);
  };

  const addCharacteristic = () => {
    setDevice_infos([
      { title: charName, description: charDisc },
      ...device_infos,
    ]);
    setCharName('');
    setCharDisc('');
  };
  return (
    <MyModal closeModal={close}>
      <div className="deviceForm__container">
        <InputGroup className="mb-2">
          <Form.Control
            aria-label="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-2">
          <Form.Select onChange={(e) => setBrand(e.target.value)} value={brand}>
            <option disabled value={''}>
              brand
            </option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
        <InputGroup className="mb-2">
          <Form.Select onChange={(e) => setType(e.target.value)} value={type}>
            <option disabled value={''}>
              type
            </option>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
        <InputGroup className="mb-2">
          <Form.Control
            aria-label="price"
            type="number"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-2">
          <Form.Control
            type="file"
            id="files"
            title="choose"
            onChange={setFileEvent}
          ></Form.Control>
        </InputGroup>
        <ListGroup variant="flush">
          {device_infos?.map((ch) => (
            <ListGroup.Item
              key={ch.title}
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <b>{ch.title}</b> {ch.description}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <InputGroup className="mb-2">
          <Form.Control
            aria-label="char-name"
            placeholder="name"
            value={charName}
            onChange={(e) => setCharName(e.target.value)}
          />
          <Form.Control
            aria-label="char-disc"
            placeholder="discription"
            value={charDisc}
            onChange={(e) => setCharDisc(e.target.value)}
          />
        </InputGroup>
        <div className="add_char">
          <Button variant="dark" className="mb-2" onClick={addCharacteristic}>
            Add characteristic
          </Button>
        </div>
        <Button variant="success" onClick={add}>
          Add Device
        </Button>
      </div>
    </MyModal>
  );
};
export default DeviceForm;
