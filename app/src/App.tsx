import * as React from "react";
import { Admin, CustomRoutes, Resource, fetchUtils } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { Route } from "react-router";
import { Login, Layout } from "./layout";
import { Dashboard } from "./dashboard";
import englishMessages from "./i18n/en";
import { lightTheme } from "./layout/themes";
import dataProvider from "ra-nest-rest";
import BuyTicket from "./buyticket/buyTickets";
import dapptxs from "./dapptxs";
import { AppWrapper } from "./components/utils";

const apiUrl = process.env.REACT_APP_API_URL;
const restProvider = dataProvider(apiUrl);

const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === "fr") {
    return import("./i18n/fr").then((messages) => messages.default);
  }
  // Always fallback on english
  return englishMessages;
}, "en");

const App = () => {
  return (
    <AppWrapper>
      <Admin
        title="bLott"
        dataProvider={restProvider}
        dashboard={Dashboard}
        loginPage={Login}
        layout={Layout}
        i18nProvider={i18nProvider}
        disableTelemetry
        theme={lightTheme}
      >
        <CustomRoutes>
          <Route path="/buyticket" element={<BuyTicket />} />
        </CustomRoutes>

        <Resource name="dapptxs" {...dapptxs} />
      </Admin>
    </AppWrapper>
  );
};

export default App;
