import React from 'react';
import ReactDOM from 'react-dom';
import './search.css';
import './search.less';
import bakugou from '../images/bakugou.jpg';
import { a, b } from './tree-sharking'

if(false){
  console.log(b());
}

class Search extends React.Component {
  render() {
    const treeSharkingText = a();
    return <div class="search">
      Search
      <div class="text">search-text</div>
      <img src={ bakugou } />
      <div>{ treeSharkingText }</div>
    </div>
  }
}

// 将 Search 渲染到 app 节点上
ReactDOM.render(
  <Search></Search>,
  document.getElementById('app')
);