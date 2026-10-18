import type { IntlShape } from 'react-intl';
import type { Contacto } from '@/content';
import { ContactField, type LegalCell } from './legal.const';

export const getContactValues = (contacto: Contacto): Record<ContactField, string> => ({
  [ContactField.ADDRESS]: `${contacto.direccion} · ${contacto.localidad}`,
  [ContactField.EMAIL]: contacto.email,
  [ContactField.PHONE]: contacto.telefono.texto,
});

export const formatCell = (cell: LegalCell, intl: IntlShape, values: Record<ContactField, string>) => {
  if ('literal' in cell) return cell.literal;
  if ('contact' in cell) return values[cell.contact];
  return intl.formatMessage({ id: cell.messageId }, values);
};
