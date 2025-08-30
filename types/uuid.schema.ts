import { z } from 'zod';

const UUIDSchema = z
  .string()
  .min(1, 'UUID is required')
  .max(36, 'UUID cannot exceed 36 characters')
  .regex(
    /([a-fA-F0-9]{8})(-[a-fA-F0-9]{4}){3}(-[a-fA-F0-9]){12}/,
    'Invalid UUID'
  );

export default UUIDSchema;
