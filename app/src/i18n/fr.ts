import { TranslationMessages } from "react-admin";
import frenchMessages from "ra-language-french";

const customFrenchMessages: TranslationMessages = {
  ...frenchMessages,
  pos: {
    search: "Rechercher",
    configuration: "Configuration",
    language: "Langue",
    theme: {
      name: "Theme",
      light: "Clair",
      dark: "Obscur",
    },
    dashboard: {},
    menu: {},
  },
  resources: {},
};

export default customFrenchMessages;
