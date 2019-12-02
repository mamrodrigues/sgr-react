import React, {Component} from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import { Link } from 'react-router-dom';

class App extends Component {

  constructor(){
    super();
  }

  render(){
    return (
      <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link">
              <span></span>
          </a>

          <div id="menu">
              <div className="pure-menu">
                  <Link className="pure-menu-heading" to="/">SGR</Link>

                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><Link to="/enderecos" className="pure-menu-link">Endereços</Link></li>
                      <li className="pure-menu-item"><Link to="/estabelecimentos" className="pure-menu-link">Estabelecimentos</Link></li>
                      <li className="pure-menu-item"><Link to="/funcionarios" className="pure-menu-link">Funcionários</Link></li>
                      <li className="pure-menu-item"><Link to="/cardapios" className="pure-menu-link">Cardápios</Link></li>
                      <li className="pure-menu-item"><Link to="/produtos" className="pure-menu-link">Produtos</Link></li>
                      <li className="pure-menu-item"><Link to="/comandas" className="pure-menu-link">Comandas</Link></li>
                  </ul>
              </div>
          </div>

          <div id="main">
            <div className="content" id="content">
              {this.props.children}
            </div>
          </div>
       </div>
    );
  }

}

export default App;
