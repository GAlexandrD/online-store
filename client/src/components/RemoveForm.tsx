import React, { FC, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import MyModal from './UI/MyModal/MyModal';
import { Button, InputGroup, Form } from 'react-bootstrap';
import '../styles/deviceForm.css';
import {
  removeBrand,
  removeDevice,
  removeType,
} from '../store/reducers/AdminActionCreators';

type typeRemove = 'device' | 'brand' | 'type';

interface RemoveProps {
  close: Function;
  type: typeRemove;
}

const RemoveForm: FC<RemoveProps> = ({ close, type }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const remove = () => {
    if (type === 'device') dispatch(removeDevice(name));
    if (type === 'brand') dispatch(removeBrand(name));
    if (type === 'type') dispatch(removeType(name));
    close();
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
        <Button variant="danger" onClick={remove}>
          remove {type}
        </Button>
      </div>
    </MyModal>
  );
};
export default RemoveForm;
