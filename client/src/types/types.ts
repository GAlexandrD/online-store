export interface CharacteristicModel {
  id: number;
  title: string;
  description: string;
}

export interface DeviceModel {
  id: number;
  name: string;
  price: number;
  brands: BrandModel;
  types: TypeModel;
  img?: string;
  device_infos?: CharacteristicModel[];
}

export interface TypeModel {
  id: number;
  name: string;
}

export interface BrandModel {
  id: number;
  name: string;
}
