import { getCommunityNameFromSlug, getCommunitySlugFromUrl } from '../communities';

describe('getCommunitySlugFromUrl', () => {
  it('should return community slug from remote instance URL', () => {
    const url = 'https://sublinks.test/c/quality-assurance';
    const result = getCommunitySlugFromUrl(url, false);

    expect(result).toBe('quality-assurance@sublinks.test');
  });

  it('should return community slug from local instance URL', () => {
    const url = 'https://sublinks.test/c/quality-assurance';
    const result = getCommunitySlugFromUrl(url, true);

    expect(result).toBe('quality-assurance');
  });
});

describe('getCommunityNameFromSlug', () => {
  it('should return community name from remote instance slug', () => {
    const slug = 'quality-assurance@sublinks.test';
    const result = getCommunityNameFromSlug(slug);

    expect(result).toBe('quality-assurance');
  });

  it('should return community name from local instance slug', () => {
    const slug = 'quality-assurance';
    const result = getCommunityNameFromSlug(slug);

    expect(result).toBe('quality-assurance');
  });
});
