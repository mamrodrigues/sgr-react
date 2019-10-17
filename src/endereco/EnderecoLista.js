import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class EnderecoLista extends Component {

  constructor(){
    super();
    this.state = {enderecos:[]};
  }

  render(){
    return(
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Endereco</th>
              <th>CEP</th>
              <th>Número</th>
              <th>Estado</th>
              <th>Cidade</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.enderecos.map(function(endereco){
                return(
                  <tr>
                    <td>{endereco.endereco}</td>
                    <td>{endereco.cep}</td>
                    <td>{endereco.numero}</td>
                    <td>{endereco.estado}</td>
                    <td>{endereco.cidade}</td>
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
