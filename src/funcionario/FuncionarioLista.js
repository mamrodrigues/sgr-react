import React, {Component} from 'react';
import PubSub from 'pubsub-js';

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
              <th>     </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.funcionarios.map(function(funcionario){
                return(
                  <tr>
                    <td>{funcionario.nome}</td>
                    <td>{funcionario.cpf}</td>
                    <td>{funcionario.dataNascimento}</td>
                    <td><button onClick={(e) => this.atualizarFuncionario(funcionario)} className="pure-button pure-button-primary">Editar</button></td>
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

}
