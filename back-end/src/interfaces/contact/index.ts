export interface IContactRequest {
  fullName: string;
  email: string;
  phone: string;
  clientId: string;
}

export interface IContactUpdate {
  fullName?: string;
  email?: string;
  phone?: string;
}
