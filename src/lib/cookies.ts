import { cookies } from 'next/headers';

export async function setCookie(user_id: string) {
    (await cookies()).set({
        name: 'yournews_user_id',
        value: user_id,
        httpOnly: true,
        secure: true,
        maxAge: 40000* 365 * 12 * 24 * 60 * 60,
        path: '/',
    });
}

export async function getCookie() {
    const cookie = (await cookies()).get('yournews_user_id');
    
    return cookie?.value;
}
