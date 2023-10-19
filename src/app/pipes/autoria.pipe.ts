import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autoria'
})
export class AutoriaPipe implements PipeTransform {

  transform(autoria: string[]): string {
    if (autoria) {
      return `${autoria[0]}${this.verificaVariosAutores(autoria)}`;
    } else {
      return '';
    }
  }

  verificaVariosAutores(autoria: string[]): string {
    let textoVariosAutores: string;

    if (autoria.length > 1) {
      return textoVariosAutores = ` e outros ${autoria.length - 1}`;
    } else {
      return textoVariosAutores = '';
    }
  }
}
