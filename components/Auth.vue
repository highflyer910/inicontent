<template>
    <n-card hoverable style="max-width: 300px">
        <n-tabs ref="tabsInstRef" v-model:value="tabsValue" size="large" justify-content="center" animated>
            <n-tab-pane name="signin" :tab="t('signin')">
                <n-form ref="SigninFormRef" :model="SigninForm" @submit="SigninSubmit">
                    <LazyRenderFieldS :model-value="SigninForm" :schema="SigninColumns" />
                    <n-button attr-type="submit" type="primary" block secondary strong :loading="Loading.Signin">
                        {{ t("signin") }}
                    </n-button>
                </n-form>
            </n-tab-pane>
            <n-tab-pane name="signup" :tab="t('signup')">
                <n-form ref="SignupFormRef" :model="SignupForm" @submit="SignupSubmit">
                    <LazyRenderFieldS :model-value="SignupForm" :schema="SignupColumns" />
                    <n-button attr-type="submit" type="primary" block secondary strong :loading="Loading.Signup">
                        {{ t("signup") }}
                    </n-button>
                </n-form>
            </n-tab-pane>
        </n-tabs>
    </n-card>
</template>

<script lang="ts" setup>
import {
    type FormInst,
    NButton,
    NCard,
    NForm,
    NTabPane,
    NTabs,
    type TabsInst,
    useMessage,
} from "naive-ui";

useLanguage({
    ar: {
        signin: "تسجيل الدخول",
        signup: "إنشاء حساب",
    },
    en: {},
});

const Loading = useState<Record<string, boolean>>("Loading", () => ({}));

const SigninFormRef = ref<FormInst | null>(null),
    route = useRoute(),
    message = useMessage(),
    tabsInstRef = ref<TabsInst | null>(null),
    tabsValue = ref((route.query.tab as string) ?? "signin"), // Default tab
    database = useState<Database>("database"),
    user = useState<User>("user"),
    SignupForm = useState(() => ({})),
    SignupFormRef = ref<FormInst | null>(null),
    SigninForm = ref({
        username: "",
        password: "",
    }),
    SigninColumns = [
        {
            id: 1,
            key: "username",
            type: "text",
            required: true,
        },
        {
            id: 2,
            key: "password",
            type: "password",
            required: true,
        },
    ],
    SignupColumns = database.value?.tables
        ?.find((item) => item.slug === "user")
        ?.schema?.filter(
            (field) =>
                !["id", "createdAt", "createdBy", "updatedAt", "role"].includes(
                    field.key,
                ),
        ) ?? [
            {
                id: 1,
                key: "username",
                type: "text",
                required: true,
            },
            {
                id: 2,
                key: "email",
                type: "email",
                required: true,
            },
            {
                id: 3,
                key: "password",
                type: "password",
                required: true,
            },
        ];

const SignupSubmit = async (e: Event) => {
    e.preventDefault();
    SignupFormRef.value?.validate(async (errors) => {
        if (!errors) {
            const bodyContent = JSON.parse(JSON.stringify(SignupForm.value));
            if (Loading.value.Signup !== true) {
                Loading.value.Signup = true;
                const data = await $fetch<Record<string, any>>(
                    `${useRuntimeConfig().public.apiBase}${database.value.slug}/user`,
                    {
                        method: "POST",
                        body: bodyContent,
                    },
                );
                if (data.result) {
                    message.success(data.message);
                    tabsValue.value = "signin";
                    tabsInstRef.value?.syncBarPosition();
                } else message.error(data.message);
                Loading.value.Signup = false;
            }
        } else message.error("The inputs are Invalid");
    });
};
const SigninSubmit = async (e: Event) => {
    e.preventDefault();
    SigninFormRef.value?.validate(async (errors) => {
        if (!errors) {
            const bodyContent = JSON.parse(JSON.stringify(SigninForm.value));
            if (Loading.value.Signin !== true) {
                Loading.value.Signin = true;
                const data = await $fetch<Record<string, any>>(
                    `${useRuntimeConfig().public.apiBase}${database.value.slug
                    }/auth/signin`,
                    {
                        method: "PUT",
                        body: bodyContent,
                    },
                );
                if (data.result?.id) {
                    message.success(data.message);
                    user.value = data.result;
                    database.value = (
                        await $fetch<any>(
                            `${useRuntimeConfig().public.apiBase}inicontent/database/${database.value.slug
                            }`,
                        )
                    ).result;
                    navigateTo(
                        !route.params.database
                            ? "/admin"
                            : `/${database.value.slug}/admin`,
                    );
                } else message.error(data.message);
                Loading.value.Signin = false;
            }
        } else message.error("The inputs are Invalid");
    });
};
useHead({
    title: `${database.value.slug} | ${t("authentication")}`,
    link: [{ rel: "icon", href: database.value?.icon ?? "" }],
});
</script>
