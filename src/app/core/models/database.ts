export enum UserRole { 
  ADMIN = 1,
  CLIENTE = 2,
  DUENO_TIENDA= 3
}

export enum StoreStatus { 
  PENDIENTE = 1,
  APROBADA = 2,
  SUSPENDIDA = 3
}

export interface User {
  id: number,
  roleId: UserRole,
  email: string,
  name: string,
  firstSurname: string,
  secondSurname?: string,
  photoUrl?: string,
  status: "ACTIVO" | "INACTIVO"
}

export interface Store { 
  id:number,
  ownerId: number,
  statusId: number,
  legalName:string,
  comercialName: string,
  logoUrl: string,
  description: string,
  email: string,
  phoneNumber: string,
  address: string,
  clabeIban: string,
  rfc: string,
  tLocalShip: string,
  tNationalShip: string
}

export interface Product { 
  id: number,
  storeId: number,
  isNewInd: number,
  discount: number,
  price: number,
  shortDesc: string,
  desc: string,
  name: string,
  photoUrl: string,
  status: string,
  deleteDate: string,
  storeInd: number,
  stock: number
}