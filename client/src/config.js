export const API_URL = "https://kanboarding.herokuapp.com/api";

export const capitalize = contents => {
  let contentArray = contents.split(" ");
  contentArray = contentArray.map(content => {
    return content.charAt(0).toUpperCase() + content.slice(1);
  });
  return contentArray.join(" ").toString();
};
