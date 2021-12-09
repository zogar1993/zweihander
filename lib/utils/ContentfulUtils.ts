import { Ancestry } from "../../src/Ancestry";

export function importify(entries: Array<any>, type: string) {
  return {
    contentTypes: [],
    tags: [],
    editorInterfaces: [],
    entries: entries.map((x) => contentfullify(x, type)),
    assets: [],
    locales: [],
    webhooks: [],
    roles: [],
  };
}

function contentfullify(entry: any, type: string) {
  return {
    metadata: { tags: [] },
    sys: {
      type: "Entry",
      contentType: {
        sys: {
          type: "Link",
          linkType: "ContentType",
          id: type,
        },
      },
    },
    fields: usify(entry),
  };
}

const usify = (data: any) => {
  const result: any = {};
  for (const key in data) result[key] = { "en-US": data[key] };
  return result;
};

const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchEntries<T>(type: string): Promise<Array<T>> {
  const response = await client.getEntries({ content_type: type, limit: 1000 }); //TODO this limit should be the world
  return response.items;
}

export function contentfulToPlainObject(obj: any) {
  return { ...obj.fields, id: obj.sys.id };
}
