import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descricao'
})
export class DescricaoPipe implements PipeTransform {

  transform(descricao: string): string {
    if (descricao) {
      return `${this.verificaTamanhoDescricao(descricao)}`
    } else {
      return 'Não há descrições disponíveis para este título.'
    }
  }

  verificaTamanhoDescricao(descricao: string) {
    if (descricao.length > 1000) {
      return descricao.substring(0, 1000) + ' (...)'
    } else {
      return descricao
    }
  }

}
