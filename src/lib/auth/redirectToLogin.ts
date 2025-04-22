import { GetServerSidePropsContext } from "next"

export const redirectToLogin = (ctx: GetServerSidePropsContext) => {
    return {
        redirect: {
            destination: `/login?redirect=${ctx.resolvedUrl}`,
            permanent: false,
        },
    }
}
