import { getRequestConfig } from 'next-intl/server';
import { getLocale } from './getLocale';
import { getMessages } from './messages';

export default getRequestConfig(async () => {
    const locale = await getLocale();
    return {
        locale,
        messages: await getMessages(locale)
    };
});
