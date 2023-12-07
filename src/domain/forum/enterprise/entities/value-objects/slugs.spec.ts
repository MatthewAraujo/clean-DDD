import { Slug } from './slug'

test('should be able to create a new slug from text ', () => {
  const slug = Slug.createFromText('an example title')
  expect(slug.value).toBe('an-example-title')
})
