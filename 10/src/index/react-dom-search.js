import React from 'react';
import ReactDOM from 'react-dom';
import './search.css';
import './search.less';
import bakugou from '../images/bakugou.jpg';
import { a, b } from './tree-sharking'
import largeNumber from 'large-number-cielsys'

if(false){
  console.log(b());
}

class Search extends React.Component {

  constructor(){
    super(...arguments);

    this.state = {
      Text: null
    }
  }

  loadComponent(){
    // 返回的是一个Promise对象
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default
      })
    })
  }

  render() {
    const { Text } = this.state;
    const treeSharkingText = a();
    const addResult = largeNumber('999', '1');
    return <div className="search">
      Search
      <div className="text">search-text</div>
      <img src={ bakugou } onClick={ this.loadComponent.bind(this) } />
      {
        Text ? <Text/> : null
      }
      { addResult }
      <div>{ treeSharkingText }</div>
    </div>
  }
}

// 将 Search 渲染到 app 节点上
ReactDOM.render(
  <Search></Search>,
  document.getElementById('app')
);