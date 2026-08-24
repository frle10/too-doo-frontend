import { describe, expect, it } from 'vitest';
import { isUuid, newUuid } from './uuid';

describe('isUuid', () => {
  it('accepts a well formed uuid', () => {
    expect(isUuid('34f082e1-26b6-4bfb-a4db-7727ed05a27f')).toBe(true);
  });

  it('accepts what newUuid produces', () => {
    expect(isUuid(newUuid())).toBe(true);
  });

  it.each([
    ['undefined', undefined],
    ['empty', ''],
    ['too short', '34f082e1-26b6-4bfb-a4db'],
    ['not hex', 'zzzzzzzz-26b6-4bfb-a4db-7727ed05a27f'],
    ['a route name', 'NotFound'],
  ])('rejects %s', (_label, value) => {
    expect(isUuid(value)).toBe(false);
  });
});
