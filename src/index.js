import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ProdutoBox from './produto/ProdutoBox';
import FuncionarioBox from './funcionario/FuncionarioBox';
import EnderecoBox from './endereco/EnderecoBox';

import Home from './home/Home';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route path="/">
          <Route exact path="/" component={Home}/>
          <Route path="/estabelecimentos"/>
          <Route path="/funcionarios" component={FuncionarioBox}/>
          <Route path="/enderecos" component={EnderecoBox}/>
          <Route path="/cardapios"/>
          <Route path="/comandas"/>
          <Route path="/produtos" component={ProdutoBox}/>
        </Route>
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
