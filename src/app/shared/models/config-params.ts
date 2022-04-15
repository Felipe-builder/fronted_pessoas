import { CampoGenerico } from './campo-generico';

export interface ConfigPrams {
  rt?: string;
  pagina?: number;
  limite?: number;
  pesquisa?: string;
  campo?: CampoGenerico;
}
