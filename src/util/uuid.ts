const UUID_PATTERN =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;

/** Replaces the `validate` export of the `uuid` package. */
export const isUuid = (value: string | undefined): value is string =>
  !!value && UUID_PATTERN.test(value);

/** Replaces the `v4` export of the `uuid` package. */
export const newUuid = (): string => crypto.randomUUID();
