export interface IPropertyUpdateResponse {
  success: boolean;
  message: string;
  data: boolean;
}

export interface IPropertyListResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    properties: IProperty[];
  };
}

export interface IGetPropertyDetail {
  id: string | number;
  data?: {
    title: string;
    location: string;
  };
}

export interface IGetPropertyParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filter?: string;
}

export interface IPropertyUpdateResponse {
  success: boolean;
  message: string;
  data: boolean;
}

export interface IPropertyDetailId {
  id: number | null | undefined;
}

export interface IPropertySpecification {
  id: number;
  property_id: number;
  property_type: string;
  title: string;
  location: string;
  landmarks: string;
  amenities: string; // stored as JSON string in DB
  price_min: number;
  price_max: number;
  title_image: string;
  description: string;
  amenities_description: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

export type PropertyVisibilityStatus = "ACTIVE" | "INACTIVE";

export interface IProperty {
  id: number;
  title: string;
  price: string;
  image: string;
  description: string;
  visibility_status: PropertyVisibilityStatus;
  specifications: IPropertySpecification[];
}

export enum PropertyVisibilityEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IPropertyUpdate {
  id: number;
  input: {
    status: PropertyVisibilityStatus;
  };
}
