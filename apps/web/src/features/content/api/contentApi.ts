// ✅ contentApi.ts
export async function fetchProtectedContent(): Promise<any> {
    const res = await fetch("http://localhost:8080/api/emotion_entries", {
        headers: {
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTE1MzI2NTIsImV4cCI6MTc1MTUzNjI1Miwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluQGNlc2l6ZW4ubG9jYWwifQ.bT5MhNzaUmRKXHnX0mMRHBtuSDrKiYxPY5s0t5FPh6uyiRkhe54TA_k1wOM0pRrhYK7TlUu_QpQ_qCYAZcVPE4w2jOdco_SQlr9POyEAoft0tK6TZ0iGOwZm9uXBiHeiVmTQQd-y62Xqoka8HKaWZwI0-5E2lh5F-1hR-TCfwTNy7ViUOeCVw7Rt15jX45mPnF73_1iaqkvNegqofJJmWId7lyxxDR72EqY19bcwAyBf01sh5Bcu072jI6Zl8YYEiqHyv13r5cNcTKtkmArY_eU3YZyBV2kn03cyyHz7V9OCyO-6g3Al4pfJut50tIpAKylsSLHQW4Yx5aSs8RhKFZmBHwT1dVo6Xzaswc0HvBkZAMoe0axj2gmqAdcEUSVKaZ-hAZGaqXoU5e1kWETiVdVqkZ4ize0l_Q-3QzImCOShXrMJ1ypujABNDa6IZN7OGohck9XnAceD3bcFDvao_3LLMGNeBBlhse_P2gaBCYFrLhuJPapon0xrlf9V0Zsxus8-29wl2r9-yA1ahHYQ-MNvjqu5cyPfMVqjYR_QYWseowhS2N4LuLgL5w0JqE9mdZLsfKYtneP-24OYPhjqZD9-CEbT5er0UwmbWUwAF-OLSHH_s0sj7Cslostm5EcHlkBesghvw9W2vLIWI9XCjb4_LoG20HsRRH0n-KxoYUg"
        }
    });

    if (!res.ok) {
        throw new Error("Erreur lors du fetch");
    }

    return res.json();
}
