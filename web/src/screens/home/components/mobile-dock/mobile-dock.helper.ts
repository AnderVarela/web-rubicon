import { HOME_NAV_ITEM, NAV_ITEMS, SectionId, type NavItem } from '@screens/components/section-nav';

export const getNavItem = (id: SectionId): NavItem => NAV_ITEMS.find((item) => item.id === id) ?? HOME_NAV_ITEM;
