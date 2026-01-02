// utils/filters.ts
import { FilterConfig } from "@/types/Filters";
import { UserStatus } from "@/constants";
import { EntityType, FILETR_ENTITIES } from "@/constants/common";

export const getFilterConfig = (entity: EntityType): FilterConfig[] => {
  switch (entity) {
    case FILETR_ENTITIES.USER:
      return [
        {
          key: "status",
          label: "Status",
          options: [
            { label: "Active", value: UserStatus.active },
            { label: "Inactive", value: UserStatus.inactive },
            { label: "Pending", value: UserStatus.pending },
          ],
          valueType: "string",
          selectType: "single",
        },
      ];

    default:
      return [];
  }
};
