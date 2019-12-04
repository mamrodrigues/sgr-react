import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class FuncionarioLista extends Component {

  constructor(){
    super();
    this.state = {funcionarios:[]};
  }

  render(){
    return(
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data de Nascimento</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.funcionarios.map(function(funcionario){

                // var val = this.state.dataNascimento.split('-');
                // var dataNascimento = new Date(val[0], val[1]-1, val[2]);
                var data = new Date(funcionario.dataNascimento);

                return(
                  <tr>
                    <td>{funcionario.nome}</td>
                    <td>{funcionario.cpf}</td>
                    <td>{this.dataFormatada(data)}</td>
                    <td><button onClick={(e) => this.atualizarFuncionario(funcionario)} className="pure-button pure-button-primary">Detalhar</button></td>
                    <td><button onClick={(e) => this.excluirFuncionario(funcionario)} className="pure-button pure-button-primary">Excluir</button></td>
                  </tr>
                );
              }.bind(this))
            }
          </tbody>
        </table>
      </div>
    );
  }

  atualizarFuncionario(funcionario){
    PubSub.publish('funcionario-editar', funcionario);
  }

  excluirFuncionario(funcionario){
    $.ajax({
        url:"http://localhost:8080/sgr/funcionarios/"+funcionario.id,
        type: 'delete',
        success:function(resposta){
          PubSub.publish('funcionario-lista');
        },
        error: function(){
          console.log("error");
        }
      }
    );
  }

  dataFormatada(dateObject){
    var data = dateObject,
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
  }

}
