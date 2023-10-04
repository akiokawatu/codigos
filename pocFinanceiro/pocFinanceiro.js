import { LightningElement, api } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import tmpl from './pocFinanceiro.html'

const columns = [
    {label:'Ativo', fieldName:'ativo', type:'text'},
    {label:'Descrição', fieldName:'descricao', type:'text'},
    {label:'Setor', fieldName:'setor', type:'text'},
    {label:'Valor', fieldName:'valor', type:'currency',
        cellAttributes:{
            class: {fieldName: 'alerta'}
        }
    },
    {label:'Qtd', fieldName:'quantidade', type:'number'}
];

const dadosFake = [
    {ativo: 'AAPL',
     descricao: 'Apple',
     setor: 'Tecnologia',
     tipo: 'ACAO',
     valor: 20000,
     quantidade: 30,
     alerta: 'slds-text-color_success'
    },
    {ativo: 'GOOG',
     descricao: 'Google',
     setor: 'Tecnologia',
     tipo: 'ACAO',
     valor: 30000,
     quantidade: 30,
     alerta: 'slds-text-color_error'
    }
]

export default class PocFinanceiro extends OmniscriptBaseMixin (LightningElement) {

    @api cliente;
    @api tipo;

    data = dadosFake;
    columns = columns;

    render() {        
        return tmpl;
    }

    teste(){
        this.getAtivos();
    }

    getAtivos(){

        const meuInput = {
            cliente: this.cliente,
            tipo: this.tipo,
            acao: 'consultarAtivos'
        }

        const params = {
            input: JSON.stringify(meuInput),
            sClassName: 'omnistudio.IntegrationProcedureService',
            sMethodName: 'acad_gerenciadorFinanceiro',
            options: '{}'
        };

        this.omniRemoteCall(params, true).then(resp =>{
            console.log(JSON.stringify(resp));
            this.data = resp.result.IPResult.ativos;

        }).catch(error =>{
                window.console.log(error,'error');
                this.showToast('Aviso', 'Erro na chamada da IP!', 'error');
        });
    }

}