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
