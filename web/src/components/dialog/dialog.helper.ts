import type { DialogPlacement, DialogTone } from './dialog.const';

export const getDialogClassName = (
  styles: Record<string, string>,
  { placement, tone, visible, className }: { placement: DialogPlacement; tone: DialogTone; visible: boolean; className?: string },
) => [styles.dialog, styles[placement], styles[tone], visible && styles.visible, className].filter(Boolean).join(' ');
