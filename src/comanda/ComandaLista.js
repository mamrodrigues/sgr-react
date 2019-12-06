import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class ComandaLista extends Component {

  constructor(){
    super();
    this.state = {comandas:[]};
  }

  render(){
    return(
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th> </th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.comandas.map(function(comanda){
                return(
                  <tr>
                    <td>{comanda.nome}</td>
                    <td>
                      <button onClick={(e) => this.detalharComanda(comanda)}
                        className="pure-button pure-button-primary">
                        Detalhar
                      </button>
                    </td>

                    <td>
                        <button disabled={comanda.fechada} onClick={(e) => this.fecharComanda(comanda)}
                          className="pure-button pure-button-primary">
                          Fechar Comanda
                        </button>
                    </td>
                    <td>
                      { !comanda.fechada ?
                        <a href={"/produtosPorComanda/"+comanda.comandaId}>FAZER PEDIDO</a>
                        : 'Comanda Fechada' }
                    </td>

                  </tr>
                )
              }.bind(this))
            }
          </tbody>
        </table>
      </div>
    );
  }

  detalharComanda(comanda){
    PubSub.publish('comanda-editar', comanda);
  }

  fecharComanda(comanda){
    comanda.fechada = true;
    $.ajax({
        url:"http://localhost:8080/sgr/comandas",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        type: 'post',
        data: JSON.stringify(
          {
            comandaId: comanda.comandaId,
            nome:comanda.nome,
            fechada:comanda.fechada
          }
        ),
        success:function(resposta){
          PubSub.publish('comanda-lista');
        }.bind(this),
        error: function(error){
          console.log(error);
        }
      }
    );
  }
}
