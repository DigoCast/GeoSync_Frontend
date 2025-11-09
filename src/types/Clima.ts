export interface Clima {
  localidade: string;
  hora_local: string;
  atualizado_em: string;
  temperatura_c: number;
  sensacao_termica_c: number;
  descricao: string;
  icone_url: string;
  umidade_perc: number;
  vento_kph: number;
}