export interface Terapija {
  id: number;
  sifra: string;
  idPacijenta: number;
  idDoktora: number;
  datumPocetka: string;
  datumKraja: string;
  brojSesija: number;
  sadrzaj: string;
  doktor: { firstName: ''; lastName: '' };
  pacijent: { firstName: ''; lastName: '' };
}
