interface CharacteristicModel {
  title: string;
  description: string;
}

interface IUser {
  id: number;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface DeviceRequest {
  [key: string]: any;
  name: string;
  price: number;
  brand: string;
  type: string;
  img?: string | Blob;
  device_infos?: CharacteristicModel[];
}
