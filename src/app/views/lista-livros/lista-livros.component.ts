import { LivrosResultado } from './../../models/interfaces';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, filter, debounceTime, distinctUntilChanged, catchError, throwError, EMPTY, of } from 'rxjs';
import { Item } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 500;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent{

  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado: LivrosResultado;

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(

    debounceTime(PAUSA),

    filter((valorDigitado) => valorDigitado.length >= 3),

    distinctUntilChanged(),

    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),

    map(resultado => this.livrosResultado = resultado),

    map(resultado => resultado.items ?? []),

    map(items => this.livrosResultadoParaLivros(items)),

    catchError(erro => {
      // se o observable de erro não for utilizado, usar EMPTY, se for utilizar dados específicos de erro, throwError.
      // this.mensagemErro = 'Ocorreu um erro. Recarregue a aplicação'
      // return EMPTY

      console.log(erro)
      return throwError(() => new Error(this.mensagemErro = 'Ocorreu um erro. Recarregue a aplicação'))
    })
  )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
   return items.map(item => {
    return new LivroVolumeInfo(item)
   })
  }
}

// ** --- **
// switchMap - Operador de Transformação. Cancela requisições de observables anteriores, emitindo valores apenas do Observable projetado mais recentemente.

// filter - Operador de filtragem. Filtra os itens emitidos pelo Observable de origem, permitindo apenas aqueles que satisfaçam uma condição especificada.

// debounceTime - Operador de filtragem. Retorna um Observable que atrasa as emissões do Observable de origem pelo tempo especificado.

// distinctUntilChanged - Operador de filtragem. Retorna um Observable que emite todos os valores enviados pelo observable de origem se forem distintos em comparação com o último valor emitido pelo observable de resultado.

// catchError - Operador de Tratamento de Erros. Captura erros no observable manipulado retornando um novo observable ou lançando um erro.

// throwError - Operador de Criação. Cria um observable que criará uma instância de erro e a enviará ao consumidor como um erro imediatamente após a assinatura.

// EMPTY - Operador de Criação. Cria um Observable simples que não emite itens para o Observer e imediatamente emite uma notificação de complete.

// of - Operador de Criação. Converte os argumentos em observable. Um Observable que emite os argumentos descritos e depois conclui.
