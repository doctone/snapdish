import { describe, expect, it } from 'vitest'
import { seo } from '~/utils/seo'

describe('seo', () => {
  it('returns title meta tag', () => {
    const result = seo({ title: 'SnapDish' })
    expect(result).toContainEqual({ title: 'SnapDish' })
  })

  it('includes description when provided', () => {
    const result = seo({ title: 'SnapDish', description: 'A recipe app' })
    expect(result).toContainEqual({
      name: 'description',
      content: 'A recipe app',
    })
  })

  it('includes image tags when image is provided', () => {
    const result = seo({
      title: 'SnapDish',
      description: 'A recipe app',
      image: 'https://example.com/img.png',
    })
    expect(result).toContainEqual({
      name: 'twitter:image',
      content: 'https://example.com/img.png',
    })
    expect(result).toContainEqual({
      name: 'og:image',
      content: 'https://example.com/img.png',
    })
  })

  it('omits image tags when no image is provided', () => {
    const result = seo({ title: 'SnapDish' })
    const imageTags = result.filter(
      (tag) =>
        'name' in tag &&
        (tag.name === 'twitter:image' || tag.name === 'og:image'),
    )
    expect(imageTags).toHaveLength(0)
  })
})