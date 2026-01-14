import http from "@/utils/protocol/http";

import { API_ENDPOINTS } from "@/utils/endpoints";
import {
  IGetPropertyDetail,
  IGetPropertyParams,
  IPropertyListResponse,
  IPropertyUpdateResponse,
  PropertyVisibilityStatus,
} from "@/types/Property";

export class ListService {
  async getAllProperty(
    params: IGetPropertyParams
  ): Promise<IPropertyListResponse> {
    return http.get(API_ENDPOINTS.PROPERTY, { params });
  }
  async getPropertyById(
    id: number | null | undefined
  ): Promise<IGetPropertyDetail> {
    return http.get(`${API_ENDPOINTS.PROPERTY}/${id}`);
  }
  async deleteProperty(id: number): Promise<IGetPropertyDetail> {
    return http.delete(`${API_ENDPOINTS.PROPERTY}/${id}`);
  }

  async updatePropertyStatus(
    id: number,
    payload: { status: PropertyVisibilityStatus }
  ): Promise<IPropertyUpdateResponse> {
    return http.patch(`${API_ENDPOINTS.PROPERTY_STATUS_UPDATE}/${id}`, payload);
  }
}
