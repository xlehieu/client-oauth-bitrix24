import ROUTE from '@/config/routes';
import Detail from './Detail';

const ContactCreatePage = () => {
    return (
        <div className="p-6 min-h-screen">
            <Detail action={ROUTE.SITEMAP_LV3.detail.method} actionDelete={ROUTE.SITEMAP_LV3.delete.method} />
        </div>
    );
};

export default ContactCreatePage;
