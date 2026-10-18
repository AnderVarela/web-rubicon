import { useIntl } from 'react-intl';
import { Icon, IconName, IconSize } from '@components/icon';
import { IconButton, IconButtonVariant } from '@components/icon-button';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import styles from './notice-bar.module.css';
import { NOTICE_BAR_MESSAGES } from './notice-bar.const';

export interface NoticeBarProps {
  text: string;
  onClose: () => void;
}

export const NoticeBar = ({ text, onClose }: NoticeBarProps) => {
  const { formatMessage } = useIntl();

  return (
    <div role="status" className={styles.noticeBar}>
      <Icon name={IconName.INFO} size={IconSize.S} />
      <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.CAPTION} tone={TypographyTone.INHERIT} className={styles.text}>
        {text}
      </Text>
      <IconButton
        icon={IconName.CLOSE}
        label={formatMessage({ id: NOTICE_BAR_MESSAGES.close })}
        variant={IconButtonVariant.GHOST_INVERSE}
        iconSize={IconSize.S}
        onClick={onClose}
        className={styles.close}
      />
    </div>
  );
};
