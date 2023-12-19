import { NIcon } from "naive-ui";
import {
  Key,
  RelationOneToOne,
  At,
  Link,
  Upload,
  Tags,
  Calendar,
  ToggleLeft,
  Code,
  AlignJustified,
  LetterCase,
  Palette,
  ListCheck,
  Brackets,
  Braces,
  Table,
  Typography,
  ShieldLock,
  Id,
} from "@vicons/tabler";
type FieldsList = {
  label: string;
  key: string;
  icon: any;
  children?: FieldsList[];
};
export default function (): FieldsList[] {
  useLanguage({
    ar: {
      fields: {
        text: "نص",
        short_text: "نص قصير",
        long_text: "نص طويل",
        html: "محرر نصوص",
        number: "رقم",
        password: "كلمة مرور",
        link: "رابط",
        email: "بريد",
        color: "لون",
        upload: "ملحق",
        tags: "وسوم",
        date: "تاريخ",
        toggle: "سحب",
        list: "قائمة",
        array: "Array",
        object: "Object",
        table: "جدول",
        role: "Role",
        id: "معرف",
      },
    },
    en: {
      fields: {
        text: "Text",
        short_text: "Short Text",
        long_text: "Long Text",
        html: "Rich Editor",
        number: "Number",
        password: "Password",
        email: "Email",
        link: "Link",
        color: "Color",
        upload: "Upload",
        tags: "Tags",
        date: "Date",
        toggle: "Toggle",
        list: "ListCheck",
        array: "Array",
        object: "Object",
        table: "Table",
        role: "Role",
        id: "ID",
      },
    },
  });
  return [
    {
      label: t("fields.text"),
      key: "string",
      icon: () => h(NIcon, () => h(Typography)),
      children: [
        {
          label: t("fields.short_text"),
          key: "text",
          icon: () => h(NIcon, () => h(LetterCase)),
        },
        {
          label: t("fields.long_text"),
          key: "textarea",
          icon: () => h(NIcon, () => h(AlignJustified)),
        },
        {
          label: t("fields.html"),
          key: "html",
          icon: () => h(NIcon, () => h(Code)),
        },
        {
          label: t("fields.password"),
          key: "password",
          icon: () => h(NIcon, () => h(Key)),
        },
        {
          label: t("fields.email"),
          key: "email",
          icon: () => h(NIcon, () => h(At)),
        },
        {
          label: t("fields.link"),
          key: "url",
          icon: () => h(NIcon, () => h(Link)),
        },
        {
          label: t("fields.role"),
          key: "role",
          icon: () => h(NIcon, () => h(ShieldLock)),
        },
        {
          label: t("fields.id"),
          key: "id",
          icon: () => h(NIcon, () => h(Id)),
        },
      ],
    },
    {
      label: t("fields.number"),
      key: "number",
      icon: () => h(NIcon, () => h(RelationOneToOne)),
    },
    {
      label: t("fields.upload"),
      key: "upload",
      icon: () => h(NIcon, () => h(Upload)),
    },
    {
      label: t("fields.tags"),
      key: "tags",
      icon: () => h(NIcon, () => h(Tags)),
    },
    {
      label: t("fields.date"),
      key: "date",
      icon: () => h(NIcon, () => h(Calendar)),
    },
    {
      label: t("fields.toggle"),
      key: "boolean",
      icon: () => h(NIcon, () => h(ToggleLeft)),
    },
    {
      label: t("fields.list"),
      key: "list",
      icon: () => h(NIcon, () => h(ListCheck)),
    },
    {
      label: t("fields.color"),
      key: "color",
      icon: () => h(NIcon, () => h(Palette)),
    },
    {
      label: t("fields.array"),
      key: "array",
      icon: () => h(NIcon, () => h(Brackets)),
    },
    {
      label: t("fields.object"),
      key: "object",
      icon: () => h(NIcon, () => h(Braces)),
    },
    {
      label: t("fields.table"),
      key: "table",
      icon: () => h(NIcon, () => h(Table)),
    },
  ];
}
