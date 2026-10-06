import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function List({ goEdit }) {
  const [sakeList, setSakeList] = useState([]);
  const [loading, setLoading] = useState(false);

  // データ取得関数
  const fetchSakeList = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("sake_list").select("*");
    if (error) {
      console.error("データ取得エラー:", error.message);
    } else {
      setSakeList(data);
    }
    setLoading(false);
  };

  // 初回読み込み
  useEffect(() => {
    fetchSakeList();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>金山サルーン 日本酒一覧</h1>
      </header>
      <button className="nav-btn" onClick={goEdit}>
        ✏️ 編集ページへ
      </button>

      {loading ? (
        <p style={{ textAlign: "center" }}>読み込み中...</p>
      ) : (
        <div className="cards">
          {sakeList.map((item) => (
            <div className="card" key={item.id}>
              <h3>{item.name}</h3>
              <p>日本酒度：{item.abv}</p>
              <p>味：{item.taste}</p>
              <p>コメント：{item.comment}</p>
            </div>
          ))}
        </div>
      )}

      <button className="refresh-btn" onClick={fetchSakeList}>
        🔄 更新
      </button>

      <footer className="footer">© Kanayama Saloon</footer>
    </div>
  );
}
