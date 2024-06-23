import { isArrayOfObjects } from "inibase/utils";

function generateSearchInOptions(
	schema: Schema,
	{ key, type, children, table }: Field,
	path?: string,
): any {
	if ((type === "object" || type === "array") && isArrayOfObjects(children))
		return {
			// type: "group",
			label: t(key),
			value: (path ?? "") + key,
			// key: (path ?? "") + key,
			children: (children as Schema)
				.filter(({ type }) =>
					Array.isArray(type)
						? type.some((t) => !["table", "array", "object"].includes(t))
						: !["table", "array", "object"].includes(type),
				)
				.map((field) =>
					generateSearchInOptions(schema, field, `${(path ?? "") + key}.`),
				),
		};
	if (type === "table")
		return {
			// type: "group",
			label: t(key),
			// key: (path ?? "") + key,
			value: (path ?? "") + key,
			children:
				useState<Database>("database")
					.value?.tables?.find(({ slug }) => slug === table)
					?.schema?.map((field, _index, schema) =>
						generateSearchInOptions(schema, field, `${(path ?? "") + key}.`),
					) ?? [],
		};

	return {
		label: t(key),
		value: (path ?? "") + key,
		ty: type,
	};
}

export default generateSearchInOptions;
