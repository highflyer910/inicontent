import {
	IconArrowsSort,
	IconAsterisk,
	IconDeviceFloppy,
	IconFileDescription,
	IconFileZip,
	IconMenu2,
	IconMusic,
	IconPhoto,
	IconPlus,
	IconTrash,
	IconVideo,
} from "@tabler/icons-vue";
import { isArrayOfObjects } from "inibase/utils";
import {
	type FormInst,
	type MentionOption,
	NAnchor,
	NAnchorLink,
	NButton,
	NCard,
	NCascader,
	NCollapse,
	NCollapseItem,
	NDropdown,
	NEmpty,
	NFlex,
	NForm,
	NFormItem,
	NGi,
	NGrid,
	NIcon,
	NInput,
	NInputNumber,
	NMention,
	NPopconfirm,
	NSelect,
	NSpace,
	NSwitch,
	NTooltip,
	useMessage,
} from "naive-ui";
import draggable from "vuedraggable";
import { LazyRenderFieldS } from "#components";

export default defineNuxtComponent({
	async setup() {
		definePageMeta({
			middleware: ["dashboard", "table"],
			layout: "table",
		});

		onMounted(() => {
			document.onkeydown = (e) => {
				if (!(e.key === "s" && (e.ctrlKey || e.metaKey))) return;
				e.preventDefault();
				updateTable();
			};
		});

		useLanguage({
			ar: {
				tableSettings: "ﻝﻭﺪﺠﻟا ﺕاﺩاﺪﻋﺇ",
				generalSettings: "ﺔﻣﺎﻋ ﺕاﺩاﺪﻋﺇ",
				schemaSettings: "ﺓﺪﻤﻋﻷا ﺕاﺩاﺪﻋﺇ",
				save: "ﻆﻔِﺣ",
				required: "ﻲﻣاﺰﻟﺇ",
				duplicatable: "ﺦﺴﻨﻠﻟ ﻞﺑﺎﻗ",
				fieldName: "ﻞﻘﺤﻟا ﻢﺳﺇ",
				allowedFiles: "ﺎﻬﺑ ﺡﻮﻤﺴﻤﻟا ﺕﺎﻔﻠﻤﻟا",
				options: "ﺕاﺭﺎﻴﺨﻟا",
				contentType: "ﻯﻮﺘﺤﻤﻟا ﻉﻮﻧ",
				showAsTable: "ﻝﻭﺪﺠﻛ ﺮﻬﻇﺃ",
				labelText: "ﺔﻴﻤﺴﺘﻟا ﺺﻧ",
				searchIn: "ﻲﻓ ﺚﺤﺒﻟا",
				labelImage: "ﺔﻴﻤﺴﺘﻟا ﺓﺭﻮﺻ",
				changeOrder: "ﺐﻴﺗﺮﺘﻟا ﺮﻴﻴﻐﺗ",
				theFollowingActionIsIrreversible: "ﻪﻴﻓ ﺔﻌﺟﺭ ﻻ ﻲﻟﺎﺘﻟا ءاﺮﺟﻹا",
			},
			en: {},
		});
		const Loading = useState<Record<string, boolean>>("Loading", () => ({}));
		Loading.value.updateTable = false;
		Loading.value.deleteTable = false;
		const Language = useCookie("Language");
		const route = useRoute(),
			router = useRouter(),
			message = useMessage(),
			showDraggable = ref(false),
			{ isMobile } = useDevice(),
			database = useState<Database>("database"),
			table = useState<Table>("table"),
			tableRef = ref<FormInst | null>(null),
			tableCopy = ref(JSON.parse(JSON.stringify(table.value))),
			handleSelectedType = (type: string) => {
				switch (type) {
					case "textarea":
						return {
							type: "string",
							subType: "textarea",
						};
					case "role":
						return {
							type: "string",
							subType: "role",
						};
					case "upload":
						return {
							type: "url",
							subType: "upload",
						};
					case "array-upload":
						return {
							type: "array",
							children: "url",
							subType: "upload",
						};
					case "array-table":
						return {
							type: "array",
							children: "table",
							subType: "table",
						};
					case "tags":
						return {
							type: "array",
							subType: "tags",
						};
					case "select":
						return {
							type: ["string", "number"],
							subType: "select",
						};
					case "array-select":
						return {
							type: "array",
							children: ["string", "number"],
							subType: "select",
						};
					case "color":
						return {
							type: "string",
							subType: "color",
						};
					case "array":
					case "object":
						return {
							type: type,
							children: [],
						};
					default:
						return { type };
				}
			},
			updateTable = async () => {
				tableRef.value?.validate(async (errors) => {
					if (!errors) {
						const bodyContent = JSON.parse(
							JSON.stringify(
								(({ schema, slug, id, label }) => ({
									schema,
									slug,
									id,
									label,
								}))(tableCopy.value),
							),
						);
						Loading.value.updateTable = true;

						const data = await $fetch<apiResponse<Table>>(
							`${useRuntimeConfig().public.apiBase}inicontent/database/${
								database.value.slug
							}/${route.params.table}`,
							{
								method: "PUT",
								body: bodyContent,
							},
						);
						const tableIndex = database.value.tables?.findIndex(
							({ slug }) => slug === route.params.table,
						);
						if (
							tableIndex !== undefined &&
							tableIndex !== -1 &&
							database.value.tables &&
							data?.result
						) {
							database.value.tables[tableIndex] = data.result;
							tableCopy.value = data.result;

							if (route.params.table !== data.result.slug)
								router.replace({
									params: { table: data.result.slug },
								});
							message.success(data?.message ?? t("success"));
						} else message.error(data?.message ?? t("error"));
						Loading.value.updateTable = false;
					} else message.error("The inputs are Invalid");
				});
			},
			deleteTable = async () => {
				Loading.value.deleteTable = true;
				const data = await $fetch<apiResponse>(
					`${useRuntimeConfig().public.apiBase}inicontent/database/${
						database.value.slug
					}/${route.params.table}`,
					{
						method: "DELETE",
					},
				);
				if (data?.result) {
					const tableIndex = database.value.tables?.findIndex(
						({ slug }) => slug === route.params.table,
					);
					if (tableIndex !== undefined && tableIndex !== -1)
						database.value.tables = database.value.tables?.toSpliced(
							tableIndex,
							1,
						);
					Loading.value.deleteTable = false;
					message.success(data?.message ?? t("success"));
					setTimeout(
						async () =>
							await navigateTo(`/${database.value.slug}/admin/tables`),
						800,
					);
				} else message.error(data?.message ?? t("error"));
				Loading.value.deleteTable = false;
			},
			GenerateLabelOptions = (
				schema: any,
				{ type, key, children }: any,
				path?: string,
				prefix?: string,
			) => {
				switch (type) {
					case "array":
					case "object":
						return children.map(
							(field: any) =>
								GenerateLabelOptions(schema, field, `${(path ?? "") + key}.`),
							(prefix ? `${prefix} ` : "") + t(key),
						);
					default:
						return {
							label: (prefix ? `${prefix} ` : "") + t(key),
							value: (path ?? "") + key,
						};
				}
			},
			changeFieldType = (
				{ id, key, required, children }: any,
				newType: string,
			) => {
				switch (newType) {
					case "object":
					case "array":
						return { id, key, type: newType, required, children };
					default:
						return { id, key, ...handleSelectedType(newType), required };
				}
			},
			CustomFields = (field: any) => {
				switch (field.subType ?? field.type) {
					case "upload":
						return [
							h(
								NFormItem,
								{
									label: t("allowedFiles"),
								},
								() =>
									h(NSelect, {
										multiple: true,
										placeholder: t("allowedFiles"),
										renderLabel: (option: any) =>
											h(NFlex, { align: "center" }, () => [
												h(NIcon, () => option.icon),
												option.label as string,
											]),
										options: [
											{
												label: t("image"),
												value: "image",
												icon: h(IconPhoto),
											},
											{
												label: t("video"),
												value: "video",
												icon: h(IconVideo),
											},
											{
												label: t("audio"),
												value: "audio",
												icon: h(IconMusic),
											},
											{
												label: t("documents"),
												value: "document",
												icon: h(IconFileDescription),
											},
											{
												label: t("archive"),
												value: "archive",
												icon: h(IconFileZip),
											},
										],
										value: field.accept,
										onUpdateValue: (v) => {
											field.accept = v;
										},
									}),
							),
						];
					case "select":
						return [
							h(
								NFormItem,
								{
									label: t("options"),
								},
								() =>
									h(NSelect, {
										value: field.values,
										onUpdateValue: (v) => {
											field.values = [...new Set(v)];
										},
										filterable: true,
										multiple: true,
										tag: true,
										showArrow: false,
										show: false,
									}),
							),
							h(
								NFormItem,
								{
									labelPlacement: "left",
									label: t("allowCustomValues"),
								},
								() =>
									h(NSwitch, {
										value: field.custom,
										onUpdateValue: (v) => {
											field.custom = v;
										},
									}),
							),
							field.type === "array"
								? h(
										NFormItem,
										{
											label: t("minimumItems"),
										},
										() =>
											h(NInputNumber, {
												value: field.min,
												onUpdateValue: (v) => {
													if (v) field.min = v;
													else delete field.min;
												},
											}),
									)
								: null,
						];
					case "object":
						return [
							h(
								NFormItem,
								{
									labelPlacement: "left",
									label: t("expandByDefault"),
								},
								() =>
									h(NSwitch, {
										value: field.expand,
										onUpdateValue: (v) => {
											field.expand = v;
										},
									}),
							),
						];
					case "tags":
						return [
							h(
								NFormItem,
								{
									label: t("contentType"),
								},
								() =>
									h(NSelect, {
										value: field.children,
										onUpdateValue: (v) => {
											field.children = v;
										},
										filterable: true,
										multiple: true,
										renderLabel: (option: any) =>
											h(NFlex, { align: "center" }, () => [
												option.icon(),
												option.label as string,
											]),
										options: flatFieldsList()
											?.filter(({ key }) =>
												[
													"string",
													"number",
													"password",
													"email",
													"url",
													"id",
												].includes(key),
											)
											.map((field) => ({
												label: field.label,
												value: field.key,
												icon: field.icon,
											})),
									}),
							),
						];
					case "table":
						return [
							h(
								NFormItem,
								{
									label: t("tableName"),
								},
								{
									default: () =>
										h(NSelect, {
											filterable: true,
											value: field.table,
											onUpdateValue: (v) => {
												field.table = v;
											},
											options: database.value.tables
												?.filter(
													({ slug }) =>
														slug !== route.params.table ||
														route.params.table === "user",
												)
												.map(({ slug, id }) => ({
													label: t(slug),
													value: slug,
												})),
										}),
								},
							),
							h(
								NFormItem,
								{
									disabled: !field.key,
									label: t("searchIn"),
								},
								{
									default: () =>
										h(NCascader, {
											disabled: !field.key,
											multiple: true,
											clearable: true,
											filterable: true,
											expandTrigger: "hover",
											checkStrategy: "child",
											cascade: false,
											value: field.searchIn,
											onUpdateValue: (v) => {
												field.searchIn = v;
											},
											options: field.key
												? database.value.tables
														?.find(({ slug }) => slug === field.table)
														?.schema?.map((_item, _index: number, schema) =>
															generateSearchInOptions(schema),
														)
														.flat(Number.POSITIVE_INFINITY) ?? []
												: [],
										}),
								},
							),
							field.type === "array"
								? h(
										NFormItem,
										{
											label: t("minimumItems"),
										},
										() =>
											h(NInputNumber, {
												value: field.min,
												onUpdateValue: (v) => {
													if (v) field.min = v;
													else delete field.min;
												},
											}),
									)
								: null,
						];
					default:
						return [];
				}
			},
			RenderSchemaElement = (schema: any) =>
				h(
					NCollapse,
					{
						style: {
							marginTop: "15px",
						},
						accordion: true,
						triggerAreas: ["main", "arrow"],
					},
					() =>
						h(
							draggable,
							{
								list: schema,
								itemKey: "id",
								handle: ".handle",
							},
							{
								item: ({ element, index }: any) =>
									h(
										NCollapseItem,
										{
											name: index,
										},
										{
											header: () => [
												h(
													NIcon,
													{
														class: "handle",
														style:
															Language.value === "ar"
																? {
																		marginLeft: "10px",
																	}
																: {
																		marginRight: "10px",
																	},
														size: 18,
													},
													() => h(IconMenu2),
												),
												element.key ? t(element.key) : "--",
											],
											"header-extra": () =>
												h(NSpace, () => [
													...(["array", "object"].includes(element.type) &&
													isArrayOfObjects(element.children)
														? [
																h(
																	NDropdown,
																	{
																		options: fieldsList(),
																		style: {
																			maxHeight: "200px",
																		},
																		scrollable: true,
																		onSelect: (type) => {
																			schema[index].children = [
																				...(schema[index].children ?? []),
																				{
																					id: `temp-${randomID()}`,
																					key: null,
																					required: false,
																					...handleSelectedType(type),
																				},
																			];
																		},
																	},
																	() =>
																		h(
																			NButton,
																			{
																				disabled: !element.key,
																				circle: true,
																				size: "small",
																			},
																			{
																				icon: () => h(NIcon, () => h(IconPlus)),
																			},
																		),
																),
															]
														: [
																h(
																	NButton,
																	{
																		round: !isMobile,
																		circle: isMobile,
																		strong: true,
																		secondary: true,
																		size: "small",
																		type: schema[index].required
																			? "error"
																			: "tertiary",
																		onClick: () => {
																			schema[index].required =
																				!schema[index].required;
																		},
																	},
																	{
																		icon: () => h(NIcon, () => h(IconAsterisk)),
																		default: () =>
																			isMobile ? null : t("required"),
																	},
																),
															]),
													h(
														NDropdown,
														{
															options: fieldsList(),
															style: {
																maxHeight: "200px",
															},
															trigger: "click",
															scrollable: true,
															onSelect: (type) => {
																schema[index] = changeFieldType(
																	schema[index],
																	type,
																);
															},
														},
														() =>
															h(
																NButton,
																{
																	strong: true,
																	secondary: true,
																	round: true,
																	size: "small",
																	type: "primary",
																},
																{
																	icon: getField(
																		element.subType ?? element.type,
																	).icon,
																	default: () =>
																		isMobile
																			? null
																			: getField(
																					element.subType ?? element.type,
																				).label,
																},
															),
													),
													h(
														NButton,
														{
															onClick: () => schema.splice(index, 1),
															circle: true,
															secondary: true,
															size: "small",
															type: "error",
														},
														{
															icon: () => h(NIcon, () => h(IconTrash)),
														},
													),
												]),
											default: () => [
												h(
													NFormItem,
													{
														label: t("fieldName"),
													},
													{
														feedback: () =>
															`#${getPath(
																tableCopy.value.schema,
																element.id,
																true,
															)}`,
														default: () =>
															h(NInput, {
																value: schema[index].key,
																onUpdateValue: (v) => {
																	schema[index].key = v;
																},
															}),
													},
												),
												...CustomFields(schema[index]),
												element.children &&
												["array", "object"].includes(element.type) &&
												isArrayOfObjects(element.children)
													? RenderSchemaElement(element.children)
													: null,
											],
										},
									),
							},
						),
				),
			generateMentionOptions = (
				schema: Schema,
				prefix?: string,
			): MentionOption[] => {
				let RETURN: MentionOption[] = [];
				for (const field of schema) {
					if (field.id?.toString().startsWith("temp-")) continue;
					if (
						(Array.isArray(field.type) && field.subType !== "tags") ||
						(field.type === "array" &&
							field.children &&
							isArrayOfObjects(field.children)) ||
						field.type === "table"
					)
						continue;
					if (field.children && isArrayOfObjects(field.children))
						RETURN = [
							...RETURN,
							...generateMentionOptions(field.children, field.key),
						];
					else
						RETURN.push({
							label: (prefix ? `${prefix}/` : "") + field.key,
							value: field.key,
						});
				}
				return RETURN;
			};

		useHead({
			title: `${database.value.slug} | ${t(table.value.slug)} > ${t("settings")}`,
			link: [{ rel: "icon", href: database.value?.icon ?? "" }],
		});

		return () =>
			h(NGrid, { xGap: 12, cols: 12, layoutShiftDisabled: true }, () => [
				h(NGi, { span: !isMobile ? 10 : 12 }, () =>
					h(
						NCard,
						{
							title: t("tableSettings"),
							hoverable: true,
						},
						{
							"header-extra": () =>
								h(NSpace, () => [
									h(
										NTooltip,
										{},
										{
											trigger: () =>
												h(
													NPopconfirm,
													{
														showIcon: false,
														onPositiveClick: deleteTable,
													},
													{
														activator: () =>
															h(
																NButton,
																{
																	type: "error",
																	tertiary: true,
																	round: true,
																	loading: Loading.value.deleteTable,
																},
																{
																	icon: () => h(NIcon, () => h(IconTrash)),
																},
															),
														default: () =>
															t("theFollowingActionIsIrreversible"),
													},
												),
											default: () => t("deleteTable"),
										},
									),
									h(
										NButton,
										{
											round: true,
											loading: Loading.value.updateTable,
											onClick: updateTable,
										},
										{
											default: () => t("save"),
											icon: () => h(NIcon, () => h(IconDeviceFloppy)),
										},
									),
								]),
							default: () =>
								h(NSpace, { vertical: true }, () => [
									h(
										NCard,
										{
											title: t("generalSettings"),
											id: "generalSettings",
											hoverable: true,
										},
										() => [
											h(
												NForm,
												{
													ref: tableRef,
													model: tableCopy.value,
												},
												() => [
													h(LazyRenderFieldS, {
														modelValue: tableCopy.value,
														schema: [
															{
																id: 1,
																key: "slug",
																type: "string",
																required: true,
															},
														],
													}),
													h(
														NFormItem,
														{
															required: true,
															label: t("label"),
															path: "label",
														},
														() =>
															h(NMention, {
																value: tableCopy.value.label,
																onUpdateValue: (value) => {
																	tableCopy.value.label = value;
																},
																options: generateMentionOptions(
																	database.value.tables?.find(
																		({ slug }) => slug === route.params.table,
																	)?.schema ?? [],
																),
															}),
													),
												],
											),
										],
									),
									h(
										NCard,
										{
											title: t("schemaSettings"),
											id: "schemaSettings",
											hoverable: true,
										},
										{
											"header-extra": () =>
												h(NSpace, () => [
													!tableCopy.value.schema ||
													tableCopy.value.schema.length < 2
														? null
														: h(
																NTooltip,
																{},
																{
																	default: () => t("changeOrder"),
																	trigger: () =>
																		h(
																			NButton,
																			{
																				round: true,
																				type: showDraggable.value
																					? "primary"
																					: "default",
																				onClick: () => {
																					showDraggable.value =
																						!showDraggable.value;
																				},
																			},
																			() => h(NIcon, () => h(IconArrowsSort)),
																		),
																},
															),
													h(
														NDropdown,
														{
															options: fieldsList(),
															style: {
																maxHeight: "200px",
															},
															scrollable: true,
															onSelect: (type) =>
																tableCopy.value.schema.push({
																	id: `temp-${randomID()}`,
																	key: null,
																	required: false,
																	...handleSelectedType(type),
																}),
														},
														() =>
															h(
																NButton,
																{ round: true },
																{
																	icon: () => h(NIcon, () => h(IconPlus)),
																},
															),
													),
												]),
											default: () =>
												!tableCopy.value.schema ||
												tableCopy.value.schema.length === 0
													? h(NEmpty)
													: [
															showDraggable.value
																? null
																: h("style", ".handle {display:none}"),
															h(
																NForm,
																{
																	size: "small",
																},
																() =>
																	RenderSchemaElement(tableCopy.value.schema),
															),
														],
										},
									),
								]),
						},
					),
				),
				!isMobile
					? h(NGi, { span: 2 }, () => [
							h(
								NAnchor,
								{
									affix: true,
									listenTo: "#container",
									top: 88,
									style: "z-index: 1",
									bound: 90,
								},
								() => [
									h(NAnchorLink, {
										title: t("generalSettings"),
										href: "#generalSettings",
									}),
									h(NAnchorLink, {
										title: t("schemaSettings"),
										href: "#schemaSettings",
									}),
								],
							),
						])
					: null,
			]);
	},
});
