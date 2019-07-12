import React from 'react';
import ReactDOM from 'react-dom';
import './search.css';
import './search.less';
import bakugou from './images/bakugou.jpg';

class Search extends React.Component {
  render() {
    return <div class="search">
      Search
      <div class="text">search-text</div>
      <img src={ bakugou } />
    </div>
  }
}

// 将 Search 渲染到 app 节点上
ReactDOM.render(
  <Search></Search>,
  document.getElementById('app')
);