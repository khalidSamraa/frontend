export default data => {
  const excludes = [
    'userAddress2',
    'userAddress3',
    'state',
    'userAddressPhone1',
    'userAddressPhone2',
    'contactPhone1',
    'contactPhone2',
    'comment'
  ];
  return Object.keys(data).reduce((acc, curr) => {
    if (excludes.includes(curr)) return acc;

    if (typeof data[curr] === 'string' && data[curr].trim() === '')
      acc[curr] = 'This field is required';
    return acc;
  }, {});
};
