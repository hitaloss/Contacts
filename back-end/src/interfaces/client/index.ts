export interface IClientRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface IClientUpdate {
  fullName?: string;
  phone?: string;
  password?: string;
}
