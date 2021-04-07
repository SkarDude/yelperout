export default function CATEGORIES() {
  let index = 0
  const categories = [
    { key: index++, section: true, label: 'Category' },
    { key: index++, label: '' },
    { key: index++, label: 'restaurants' },
    { key: index++, label: 'auto' },
    { key: index++, label: 'hotels' },
    { key: index++, label: 'homeservices' },
    { key: index++, label: 'shopping' },
    { key: index++, label: 'bars' },
  ]
  return categories
}
