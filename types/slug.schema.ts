import { z } from 'zod';

const SlugSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Slug must be lowercase and contain only letters, numbers, and hyphens.'
  );

export default SlugSchema;
