import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

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
                    <td><button onClick={(e) => this.atualizarProduto(produto)} className="pure-button pure-button-primary">Detalhar</button></td>
                    <td><button onClick={(e) => this.excluirProduto(produto)} className="pure-button pure-button-primary">Excluir</button></td>
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

  excluirProduto(produto){
    $.ajax({
        url:"http://localhost:8080/sgr/produtos/"+produto.produtoId,
        type: 'delete',
        success:function(resposta){
          PubSub.publish('produto-lista');
        },
        error: function(){
          console.log("error");
        }
      }
    );
  }

}
