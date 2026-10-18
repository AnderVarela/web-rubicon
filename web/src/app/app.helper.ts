export const applyDocumentMeta = (doc: Document, { lang, title, description }: { lang: string; title: string; description: string }) => {
  doc.documentElement.lang = lang;
  doc.title = title;
  doc.querySelector('meta[name="description"]')?.setAttribute('content', description);
};
