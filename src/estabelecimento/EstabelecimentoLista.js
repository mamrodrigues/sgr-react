import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class EstabelecimentoLista extends Component {

  constructor(){
    super();
    this.state = {estabelecimentos:[]};
  }

  render(){
    return(
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CNPJ</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.estabelecimentos.map(function(estabelecimento){
                return(
                  <tr>
                    <td>{estabelecimento.nome}</td>
                    <td>{estabelecimento.cnpj}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

}
