async function fetchJapanNews() {
    try {
        const rssUrl = "https://english.kyodonews.net/rss/news.xml";
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "ok") {
            const newsContainer = document.getElementById("news-container");
            newsContainer.innerHTML = "";

            const newsItems = data.items.slice(0, 2);

            newsItems.forEach(item => {
                const newsCard = document.createElement("div");
                newsCard.className = "news-card";

                const title = document.createElement("h3");
                title.textContent = item.title;

                const description = document.createElement("p");
                description.textContent =
                    item.description && item.description.length > 100
                        ? item.description.substring(0, 100) + "..."
                        : (item.description || "無描述");

                const link = document.createElement("a");
                link.href = item.link;
                link.textContent = "閱讀更多";
                link.target = "_blank";

                const img = document.createElement("img");
                if (item.enclosure && item.enclosure.link) {
                    img.src = item.enclosure.link;
                    img.alt = item.title;
                } else {
                    img.src = "https://source.unsplash.com/400x250/?japan,news";
                    img.alt = "預設新聞圖片";
                }

                newsCard.appendChild(img);
                newsCard.appendChild(title);
                newsCard.appendChild(description);
                newsCard.appendChild(link);

                newsContainer.appendChild(newsCard);
            });
        } else {
            throw new Error("RSS 資料格式錯誤");
        }
    } catch (error) {
        console.error("抓取新聞時發生錯誤:", error);

        const newsContainer = document.getElementById("news-container");
        newsContainer.innerHTML = `
            <div class="news-card">
                <img src="https://i.ytimg.com/vi/0gYoV9Byug4/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLCI2KCf50PdDFAjvnN3TtzVK981dQ" alt="工頭堅YT">
                <h3>日本溫泉大解密！13分鐘認識日本名湯 日本溫泉飯店推薦</h3>
                <p>溫泉，早已是日本文化的一部分，更是旅客
                   規劃行程的重要元素與體驗。本集將為各位
                   介紹日本溫泉簡史，以及各家雜誌選出的最
                   新溫泉旅遊資訊，不僅今年適用，年年都適
                   用！</p>
                <a href="https://www.youtube.com/watch?v=0gYoV9Byug4&list=LL&index=23" target="_blank">
                    <div class="action">前往觀看此影片</div>
                </a>
            </div>

            <div class="news-card">
                <img src="index_introduce.png" alt="冷水">
                <h3>全網獨家！深入探訪日本收入最低的村莊</h3>
                <p>山裡的生活究竟如何？聽聽當地老人的真實
                   回答…深入探訪日本群馬縣南牧村，透過實
                   地走訪與當地老人的訪談，展現村民樸實生
                   活、資源匱乏與年輕人口流失的現況，同時
                   也呈現山村中的自然景致與人情溫暖</p>
                <a href="https://youtu.be/JbYxFIz_dO0?si=7SLTFdJRrGkaYc5u" target="_blank">
                    <div class="action">前往觀看此影片</div>
                </a>
            </div>

            <div class="news-card">
                <img src="https://i.ytimg.com/vi/7t71LxGjVX8/hqdefault.jpg?sqp=-oaymwFACKgBEF5IWvKriqkDMwgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAHwAQH4AbYIgAKAD4oCDAgAEAEYciBUKD0wDw==&rs=AOn4CLDLppzBvbXFFTTJPiIGPaM-KUp58Q" alt="Ken">
                <h3>東京必吃，超濃巧克力泡芙！東京必吃東京必吃東京必吃</h3>
                <p>東京銀座 Patisserie Ten& #東京旅行東京銀座 Patisserie Ten& #東京旅行東京銀座 Patisserie Ten& #東京旅行東京銀座 Patisserie Ten& #東京旅行京旅行東京銀座 Patisserie Ten& #</p>
                <a href="https://www.youtube.com/watch?v=7t71LxGjVX8&list=LL&index=71" target="_blank">
                    <div class="action">前往觀看此短片</div>
                </a>
            </div>
        `;
    }
}

fetchJapanNews();
setInterval(fetchJapanNews, 1800000);