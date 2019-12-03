import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class ProdutoLista extends Component {

  constructor(){
    super();
    this.state = {produtos:[]};
  }

  render(){
    return(
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.produtos.map(function(produto){
                return(
                  <tr>
                    <td>{produto.nome}</td>
                    <td>{produto.descricao}</td>
                    <td>{produto.valor}</td>
                    <td><button onClick={(e) => this.atualizarProduto(produto)} className="pure-button pure-button-primary">Editar</button></td>
                  </tr>
                );
              }.bind(this))
            }
          </tbody>
        </table>
      </div>
    );
  }

  atualizarProduto(produto){
    PubSub.publish('produto-editar', produto);
  }

}
