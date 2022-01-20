// user query
export const userQuery = (userId) => {
  const query = `*[_type == 'user' && _id == '${userId}']`;
  //   checking the user table in sanity and fetching the matching id

  return query;
};
