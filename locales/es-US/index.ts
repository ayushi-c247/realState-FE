import Auth from "./Auth";
import Front from "./Front";
import generic from "./Generic/generic";
import { header, sidebar } from "./Layout";
import userManagement from "./User";
import Components from "./Components";
import filterMangement from "./Filters";

const esUS = {
  ...Auth,
  ...generic,
  ...sidebar,
  ...header,
  ...userManagement,
  ...Front,
  ...Components,
  ...filterMangement,
};

export default esUS;
