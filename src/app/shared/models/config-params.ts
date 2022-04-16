import { CampoGenerico } from './campo-generico';

export interface ConfigParams {
  rt?: string;
  pagina?: number;
  limite?: number;
  pesquisa?: string;
  campo?: CampoGenerico;
}
