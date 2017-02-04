import * as React from 'react';
import {connect} from 'react-redux';
import {GlobalState} from '../actions/reducer';
import {ConfigItem} from '../services/config';
import Item from './Item';

interface AppProps {
  items: ConfigItem[]
}

const selectProps = (state: GlobalState): AppProps => {
  return {
    items: state.config.items
  };
};

const App = (props: AppProps) => (
  <div className="tweaks-ui">
    {
      props.items && props.items.map((item) => (
        <Item item={item}/>
      ))
    }
  </div>
);

export default connect(selectProps)(App);