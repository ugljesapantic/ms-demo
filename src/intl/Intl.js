import React from "react";
import { IntlProvider } from "react-intl";

import messages from './messages';

export const Context = React.createContext();

export const LANGUAGES = {
  'src': {
    locale: 'sr',
    name: 'Српски'
  }, 'srl': {
    locale: 'sr',
    name: 'Srpski'
  }, 'en': {
    locale: 'en',
    name: 'English'
  }
}

export default class Intl extends React.Component {
    constructor(...args) {
      super(...args);

      this.switchTo = id => {
        this.setState({ locale: LANGUAGES[id].locale, messages: messages[id], id });
      }

      const initLocale = 'en';

      this.state = {
        locale: initLocale,
        id: initLocale,
        messages: messages[initLocale],
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
          >
            {children}
          </IntlProvider>
        </Context.Provider>
      );
    }
  }
  