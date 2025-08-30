export default function formatSlug(slug: string, shouldTrim?: boolean) {
  const formattedSlug = slug
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace all inner spaces with hyphens
    .replace(/[^a-zA-Z0-9-]/g, '') // Replace all non-alphanumeric characters with an empty string
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen

  if (shouldTrim) return formattedSlug.replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
  return formattedSlug;
}
