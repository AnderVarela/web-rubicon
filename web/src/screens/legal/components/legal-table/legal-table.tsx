import { useIntl } from 'react-intl';
import type { ContactField, LegalTableData } from '@screens/legal/legal.const';
import { formatCell } from '@screens/legal/legal.helper';
import styles from './legal-table.module.css';

export interface LegalTableProps {
  table: LegalTableData;
  values: Record<ContactField, string>;
}

export const LegalTable = ({ table, values }: LegalTableProps) => {
  const intl = useIntl();

  return (
    // La tabla puede ser más ancha que el móvil: se desplaza dentro de su propio marco.
    <div className={styles.legalTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            {table.head.map((id) => (
              <th key={id} scope="col" className={styles.head}>
                {intl.formatMessage({ id })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={formatCell(row[0], intl, values)}>
              {row.map((cell, index) => (
                <td key={table.head[index]} className={styles.cell}>
                  {formatCell(cell, intl, values)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
