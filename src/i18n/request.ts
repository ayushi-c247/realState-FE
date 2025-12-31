import { getRequestConfig } from "next-intl/server";

import messages from "../../locales/es-US";

export default getRequestConfig(async () => {
  const locale = "en";

  return {
    locale,
    messages,
  };
});
