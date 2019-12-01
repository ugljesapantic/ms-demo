import React from "react";
import { IntlProvider } from "react-intl";

import * as messages from './messages.json';

export const Context = React.createContext();

export default class Intl extends React.Component {
    constructor(...args) {
      super(...args);
  
      this.switchTo = (locale) =>
        this.setState({ locale: locale, messages: messages[locale] });

      this.state = {
        locale: "en",
        messages: messages['en'],
        switchTo: this.switchTo, 
      };
    }
  
    render() {
      const { children } = this.props;
      const { locale, messages } = this.state;
      return (
        <Context.Provider value={this.state}>
          <IntlProvider
            key={locale}
            locale={locale}
            messages={messages}
            defaultLocale="en"
          >
            {children}
          </IntlProvider>
        </Context.Provider>
      );
    }
  }
  