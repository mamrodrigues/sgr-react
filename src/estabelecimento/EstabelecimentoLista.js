import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

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
                    <td><button onClick={(e) => this.atualizarEstabelecimento(estabelecimento)} className="pure-button pure-button-primary">Detalhar</button></td>
                    <td><button onClick={(e) => this.excluirEstabelecimento(estabelecimento)} className="pure-button pure-button-primary">Excluir</button></td>
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

  excluirEstabelecimento(estabelecimento){
    $.ajax({
        url:"http://localhost:8080/sgr/estabelecimentos/"+estabelecimento.estabelecimentoId,
        type: 'delete',
        success:function(resposta){
          PubSub.publish('estabelecimento-lista');
        },
        error: function(){
          console.log("error");
        }
      }
    );
  }

}
