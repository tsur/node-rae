import fetch from "isomorphic-fetch";
import { RAE_OFFICIAL_HTTP_ENDPOINT, RAE_SEARCH_ACTION } from "helpers/constants";
import { toFormData } from "helpers/utils";
import { NotFoundError } from "clients/http/errors";
import { parseAuthData, parseRaeData } from "clients/http/parse";

export default async function(word, options = {endpoint: RAE_OFFICIAL_HTTP_ENDPOINT, action: RAE_SEARCH_ACTION}) {
  const HTTPRaeAuthResponse = await fetch(
    `${options.endpoint}${options.action}${encodeURI(word)}`,
    { method: "GET" }
  );

  if (HTTPRaeAuthResponse.status !== 200) {
    throw NotFoundError(word);
  }

  const HTTPRaeAuthData = await parseAuthData(await HTTPRaeAuthResponse.text());

  const HTTPRaeDataResponse = await fetch(
    `${options.endpoint}${options.action}${encodeURI(word)}`,
    { method: "POST", body: toFormData(HTTPRaeAuthData) }
  );

  if (HTTPRaeDataResponse.status !== 200) {
    throw NotFoundError(word);
  }

  return await parseRaeData(await HTTPRaeDataResponse.text());
}
