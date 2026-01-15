import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ListService } from "@/services/property";

import {
  IGetPropertyParams,
  IPropertyDetailId,
  IPropertyListResponse,
  IPropertyUpdate,
  IPropertyUpdateResponse,
} from "@/types/Property";

const propertyService = new ListService();

export const property = {
  LIST: "property-list",
  DETAIL: "property-detail",
  Property: "property",
};

export const useGetAllPropertiesQuery = (params: IGetPropertyParams) => {
  return useQuery<IPropertyListResponse>({
    queryKey: [property.LIST, params],
    queryFn: () => propertyService.getAllProperty(params),
    enabled: !!params,
    refetchOnWindowFocus: false,
  });
};

export const useGetPropertyDetailsByIdQuery = (params: IPropertyDetailId) => {
  return useQuery({
    queryKey: [property.DETAIL, params],
    queryFn: () => propertyService.getPropertyById(params.id),
    refetchOnWindowFocus: false,
  });
};

export const useDeletePropertyMutation = (): UseMutationResult<
  any,
  Error,
  { id: number }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => propertyService.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [property.LIST] });
    },
    onError: (error) => {
      console.error("Delete property failed:", error);
    },
  });
};

export const useUpdatePropertyStatusMutation = (): UseMutationResult<
  IPropertyUpdateResponse,
  Error,
  IPropertyUpdate
> => {
  const queryClient = useQueryClient();
  return useMutation<IPropertyUpdateResponse, Error, IPropertyUpdate>({
    mutationFn: ({ id, input }) =>
      propertyService.updatePropertyStatus(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [property.LIST] });
    },
    onError: (error) => {
      console.error("Update property status failed:", error);
    },
  });
};
