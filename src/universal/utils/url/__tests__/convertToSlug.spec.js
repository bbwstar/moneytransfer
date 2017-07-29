import convertToSlug from '../convertToSlug';

describe('convertToSlug (UTILS)', () => {
  it('converts uppercase to lowercase', () => {
    const text = 'CzechRepublic';

    expect(convertToSlug(text)).toBe('czechrepublic');
  });

  it('converts space to hyphen', () => {
    const text = 'text with space';

    expect(convertToSlug(text)).toBe('text-with-space');
  });

  it('does not convert hyphen to multiple hyphens', () => {
    const text = 'text-with-dashes';

    expect(convertToSlug(text)).toBe('text-with-dashes');
  });

  it('converts dash to hyphen', () => {
    const text = 'text - with - dashes';

    expect(convertToSlug(text)).toBe('text-with-dashes');
  });

  it('removes special character', () => {
    const text = 'Special™characte$@%.r';

    expect(convertToSlug(text)).toBe('specialcharacter');
  });
});
