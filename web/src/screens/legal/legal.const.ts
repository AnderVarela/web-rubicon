import { LegalDocumentId } from '@screens/components/legal-nav';

export const LEGAL_UPDATED_AT = '2026-10-01';
export const LEGAL_MAIN_ID = 'documento';

export const LEGAL_MESSAGES = {
  eyebrow: 'legal.eyebrow',
  updated: 'legal.updated',
  pageTitle: 'legal.pageTitle',
  skipToContent: 'common.skipToContent',
} as const;

export enum ContactField {
  ADDRESS = 'address',
  EMAIL = 'email',
  PHONE = 'phone',
}

// Celda de tabla: un texto traducido, un identificador técnico literal o un dato de contacto de web.json.
export type LegalCell = { messageId: string } | { literal: string } | { contact: ContactField };

export interface LegalTableData {
  head: string[];
  rows: LegalCell[][];
}

export interface LegalSectionData {
  titleId: string;
  paragraphIds: string[];
  table?: LegalTableData;
}

export interface LegalDocumentData {
  titleId: string;
  sections: LegalSectionData[];
}

const m = (messageId: string): LegalCell => ({ messageId });
const section = (prefix: string, number: number, paragraphs = 1, table?: LegalTableData): LegalSectionData => ({
  titleId: `${prefix}.s${number}.title`,
  paragraphIds: Array.from({ length: paragraphs }, (_, index) => `${prefix}.s${number}.p${index + 1}`),
  table,
});

const COOKIES = 'legal.cookies';
const NOTICE = 'legal.notice';
const PRIVACY = 'legal.privacy';
const ACCESSIBILITY = 'legal.accessibility';

export const LEGAL_DOCUMENT_CONTENT: Record<LegalDocumentId, LegalDocumentData> = {
  [LegalDocumentId.NOTICE]: {
    titleId: `${NOTICE}.title`,
    sections: [
      section(NOTICE, 1, 1, {
        head: [`${NOTICE}.table.field`, `${NOTICE}.table.value`],
        rows: [
          [m(`${NOTICE}.table.owner`), m(`${NOTICE}.table.ownerValue`)],
          [m(`${NOTICE}.table.taxId`), m(`${NOTICE}.table.taxIdValue`)],
          [m(`${NOTICE}.table.address`), { contact: ContactField.ADDRESS }],
          [m(`${NOTICE}.table.registry`), m(`${NOTICE}.table.registryValue`)],
          [m(`${NOTICE}.table.email`), { contact: ContactField.EMAIL }],
          [m(`${NOTICE}.table.phone`), { contact: ContactField.PHONE }],
        ],
      }),
      section(NOTICE, 2),
      section(NOTICE, 3),
      section(NOTICE, 4),
    ],
  },
  [LegalDocumentId.PRIVACY]: {
    titleId: `${PRIVACY}.title`,
    sections: [
      section(PRIVACY, 1),
      section(PRIVACY, 2, 1, {
        head: [`${PRIVACY}.table.channel`, `${PRIVACY}.table.data`, `${PRIVACY}.table.purpose`, `${PRIVACY}.table.retention`],
        rows: [
          [m(`${PRIVACY}.table.email`), m(`${PRIVACY}.table.emailData`), m(`${PRIVACY}.table.reply`), m(`${PRIVACY}.table.months12`)],
          [m(`${PRIVACY}.table.whatsapp`), m(`${PRIVACY}.table.whatsappData`), m(`${PRIVACY}.table.reply`), m(`${PRIVACY}.table.months12`)],
        ],
      }),
      section(PRIVACY, 3),
    ],
  },
  [LegalDocumentId.COOKIES]: {
    titleId: `${COOKIES}.title`,
    sections: [
      section(COOKIES, 1),
      section(COOKIES, 2, 1, {
        head: [`${COOKIES}.table.cookie`, `${COOKIES}.table.owner`, `${COOKIES}.table.purpose`, `${COOKIES}.table.duration`, `${COOKIES}.table.type`],
        rows: [
          [{ literal: 'rubicon_ck' }, m(`${COOKIES}.table.ownRubicon`), m(`${COOKIES}.table.purposeConsent`), m(`${COOKIES}.table.months12`), m(`${COOKIES}.table.technical`)],
          [{ literal: 'NID' }, m(`${COOKIES}.table.ownGoogle`), m(`${COOKIES}.table.purposeMap`), m(`${COOKIES}.table.months6`), m(`${COOKIES}.table.maps`)],
          [{ literal: 'AEC' }, m(`${COOKIES}.table.ownGoogle`), m(`${COOKIES}.table.purposeSecurity`), m(`${COOKIES}.table.months6`), m(`${COOKIES}.table.maps`)],
        ],
      }),
      section(COOKIES, 3, 2),
      section(COOKIES, 4),
      section(COOKIES, 5),
    ],
  },
  [LegalDocumentId.ACCESSIBILITY]: {
    titleId: `${ACCESSIBILITY}.title`,
    sections: [section(ACCESSIBILITY, 1), section(ACCESSIBILITY, 2), section(ACCESSIBILITY, 3), section(ACCESSIBILITY, 4)],
  },
};
