import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class CardapioLista extends Component {

  constructor(){
    super();
    this.state = {cardapios:[]};
  }

  render(){
    return(
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.cardapios.map(function(cardapio){
                return(
                  <tr>
                    <td>{cardapio.nome}</td>
                    <td>{cardapio.descricao}</td>
                    <td><button onClick={(e) => this.atualizarCardapio(cardapio)} className="pure-button pure-button-primary">Detalhar</button></td>
                    <td><button onClick={(e) => this.excluirCardapio(cardapio)} className="pure-button pure-button-primary">Excluir</button></td>
                  </tr>
                );
              }.bind(this))
            }
          </tbody>
        </table>
      </div>
    );
  }

  atualizarCardapio(cardapio){
    PubSub.publish('cardapio-editar', cardapio);
  }

  excluirCardapio(cardapio){
    $.ajax({
        url:"http://localhost:8080/sgr/cardapios/"+cardapio.cardapioId,
        type: 'delete',
        success:function(resposta){
          PubSub.publish('cardapio-lista');
        },
        error: function(){
          console.log("error");
        }
      }
    );
  }

}
