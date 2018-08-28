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
              // {
              //   main:'车是事实是事实的事发生发射点反对 士大夫大师傅似的是是',
              //   link:'www.baidu.com',
              //   img:''
              // }
          ],
          editingItemIndex:-1
        }
  }

  addItem = () => {
    this.setState({
      editingItemIndex:this.state.list.length,
      list:this.state.list.concat({
        main:'',
        link:'',
        img:''
      })
    })
  }

  handleInputChange = (event) => {
    const editingItemIndex = this.state.editingItemIndex
    const list = [...this.state.list];
    console.log(list)
    list[editingItemIndex].main=event.target.value
    this.setState({
      list
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    // if(this.state.editingItemIndex !== -1)return false;
    return true
  }

  render() {
    console.log(1);
    
    return <div>
              <Home list={this.state.list} handleInputChange={this.handleInputChange}/>
              <AddBottom addItem={this.addItem}/>
            </div>
  }
}
