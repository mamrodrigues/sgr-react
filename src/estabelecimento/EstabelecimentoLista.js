import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class EstabelecimentoLista extends Component {

  constructor(){
    super();
    this.state = {estabelecimentos:[]};
  }

  render(){
    return(
      <div style={{paddingTop:'20px'}}>
        <table className="pure-table">
          <thead>
            <tr>
              <th>NOME DO ESTABELECIMENTO</th>
              <th>CNPJ</th>
              <th>    </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.estabelecimentos.map(function(estabelecimento){
                return(
                  <tr>
                    <td>{estabelecimento.nome}</td>
                    <td>{estabelecimento.cnpj}</td>
                    <td><button onClick={(e) => this.atualizarEstabelecimento(estabelecimento)} className="pure-button pure-button-primary">Editar</button></td>
                  </tr>
                )
              }.bind(this))
            }
          </tbody>
        </table>
      </div>
    );
  }

  atualizarEstabelecimento(estabelecimento){
    PubSub.publish('estabelecimento-editar', estabelecimento);
  }

}
