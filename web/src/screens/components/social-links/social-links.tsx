import { useIntl } from 'react-intl';
import { IconButton, IconButtonSize, IconButtonVariant } from '@components/icon-button';
import { IconSize } from '@components/icon';
import { CONTENT, type Red } from '@/content';
import styles from './social-links.module.css';
import { SOCIAL_LINKS_MESSAGES, SocialLinksVariant } from './social-links.const';
import { getConfiguredNetworks } from './social-links.helper';

export interface SocialLinksProps {
  variant?: SocialLinksVariant;
  redes?: Partial<Record<Red, string>>;
}

const BUTTON_VARIANT: Record<SocialLinksVariant, IconButtonVariant> = {
  [SocialLinksVariant.OUTLINE]: IconButtonVariant.OUTLINE,
  [SocialLinksVariant.OUTLINE_INVERSE]: IconButtonVariant.OUTLINE_INVERSE,
  [SocialLinksVariant.GHOST_INVERSE]: IconButtonVariant.GHOST_INVERSE,
};

export const SocialLinks = ({ variant = SocialLinksVariant.OUTLINE, redes = CONTENT.contacto.redes }: SocialLinksProps) => {
  const { formatMessage } = useIntl();
  const networks = getConfiguredNetworks(redes);
  if (!networks.length) return null;
  const large = variant === SocialLinksVariant.OUTLINE;

  return (
    <ul aria-label={formatMessage({ id: SOCIAL_LINKS_MESSAGES.label })} className={[styles.socialLinks, styles[variant]].join(' ')}>
      {networks.map((network) => (
        <li key={network.id}>
          <IconButton
            icon={network.icon}
            label={formatMessage({ id: network.messageId })}
            href={network.url}
            external
            variant={BUTTON_VARIANT[variant]}
            size={large ? IconButtonSize.L : IconButtonSize.M}
            iconSize={large ? IconSize.L : IconSize.M}
          />
        </li>
      ))}
    </ul>
  );
};
