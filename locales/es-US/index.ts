import Auth from "./Auth";
import Front from "./Front";
import generic from "./Generic/generic";
import { header, sidebar } from "./Layout";
import userManagement from "./User";
import Components from "./Components";
import filterMangement from "./Filters";
import dashboard from "./Dashboard";

const esUS = {
  ...Auth,
  ...generic,
  ...sidebar,
  ...header,
  ...userManagement,
  ...Front,
  ...Components,
  ...filterMangement,
  ...dashboard,
};

export default esUS;
