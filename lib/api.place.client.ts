import { ofetch } from "ofetch";

export const placeDbClient = ofetch.create({
  baseURL: "https://api.placedb.org/v1",
});
