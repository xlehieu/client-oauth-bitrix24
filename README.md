# 🚀 Triển Khai ứng dụng tích hợp vào Bitrix24 - phía client Lên Vercel

## 📦 Giới thiệu

Ứng dụng phía client tích hợp vào Bitrix24 em sử dụng Nextjs

---

## 🧱 Trước khi bắt đầu

Trước khi tiến hành deploy, bạn cần đảm bảo:

-   ✅ Anh/chị đăng nhập Vercel: [https://vercel.com/signup](https://vercel.com/signup)
-   ✅ Dự án Next.js đã được push lên GitHub, GitLab hoặc Bitbucket
-   ✅ Đã cài đặt các dependency và chạy thử thành công local với:

    ```bash
    npm install
    npm run dev
    ```

---

Thiết lập biến môi trường trong file `.env`:

    ```env
    PORT=8080
    BITRIX_CLIENT_ID=local.6840f32c4595b6.11637008
    BITRIX_CLIENT_SECRET=RWwFsClBMjCBns7r63TPu9Pl6o4yRncrv7Ef3W0XothoPqcNpa
    FRONTEND_URL=http://localhost:3000
    DATABASE_URI=mongodb+srv://xlehieu:Hieumao2003@cluster0.uwnpg.mongodb.net/OAuthBitrix?retryWrites=true&w=majority&appName=Cluster0
    ALLOWED_ORIGINS=http://localhost:3000,https://client-oauth-bitrix24.vercel.app
    JWT_SECRET=i_want_to_work_at_AASC
    ```

## 🛠️ Cấu Hình deploy Vercel

-   ✅ Anh/chị đăng nhập Vercel: [https://vercel.com/signup](https://vercel.com/signup)
-   ✅ Dự án Next.js đã được push lên GitHub, GitLab hoặc Bitbucket
    > 🔧 Để server có thể chạy nhanh hơn thì sau khi deploy anh chị có thể cấu hình ở Vercel: Settings => Functions => Advanced Settings => đổi sang Asia Pacific ạ

❗Phía client dùng Next thì mục Build and Output Settings để mặc định ạ  
🔒 Các biến môi trường ở mục Enviroment Variables:

```env
    PORT=8080
    BITRIX_CLIENT_ID=local.6840f32c4595b6.11637008
    BITRIX_CLIENT_SECRET=RWwFsClBMjCBns7r63TPu9Pl6o4yRncrv7Ef3W0XothoPqcNpa
    FRONTEND_URL=http://localhost:3000
    DATABASE_URI=mongodb+srv://xlehieu:Hieumao2003@cluster0.uwnpg.mongodb.net/OAuthBitrix?retryWrites=true&w=majority&appName=Cluster0
    ALLOWED_ORIGINS=http://localhost:3000,https://client-oauth-bitrix24.vercel.app
    JWT_SECRET=i_want_to_work_at_AASC
```

===>>> Hoàn tất
