import React, { FC, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import MyModal from './UI/MyModal/MyModal';
import { Button, InputGroup, Form } from 'react-bootstrap';
import '../styles/deviceForm.css';
import { addBrand } from '../store/reducers/AdminActionCreators';
import { reject } from '../store/reducers/AdminState';

interface BrandProps {
  close: Function;
}

const BrandForm: FC<BrandProps> = ({ close }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const add = () => {
    if (!name) {
      close();
      return dispatch(reject('please input name'));
    }
    dispatch(addBrand(name));
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
        <Button variant="success" onClick={add}>
          Add Brand
        </Button>
      </div>
    </MyModal>
  );
};
export default BrandForm;
