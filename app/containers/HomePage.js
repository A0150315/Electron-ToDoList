// @flow
import React, {
  Component
} from 'react';
import Home from '../components/Home';
import AddBottom from '../components/AddBottom';

type Props = {};

export default class HomePage extends Component < Props > {
  props: Props;

  constructor(props) {
    super(props)
    this.state = {
          list: [
              {
                main:'车是事实是事实的事发生发射点反对 士大夫大师傅似的是是',
                link:'',
                img:''
              }
          ]
        }
    }

  render() {
    return <div>
              <Home list={this.state.list}/>
              <AddBottom/>
            </div>
  }
}
