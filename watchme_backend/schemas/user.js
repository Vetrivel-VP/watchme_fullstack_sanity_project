export default {
  name: "user",
  title: "User",
  type: "document", //each user data is going to be a document
  fields: [
    {
      name: "userName",
      title: "UserName",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "string",
    },
  ],
};
