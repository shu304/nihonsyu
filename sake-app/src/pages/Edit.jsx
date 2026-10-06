import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Edit() {
  const [sakeList, setSakeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [abv, setAbv] = useState("");
  const [taste, setTaste] = useState("");
  const [comment, setComment] = useState("");

  // 一覧取得
  const fetchSakeList = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("sake_list").select("*");
    if (error) console.error(error);
    else setSakeList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSakeList();
  }, []);

  // 追加
  const addSake = async () => {
    if (!name) return alert("名前は必須です");

    const { error } = await supabase.from("sake_list").insert({
      name,
      abv,
      taste,
      comment,
    });

    if (error) {
      alert("追加エラー: " + error.message);
    } else {
      alert("追加しました！");
      setName("");
      setAbv("");
      setTaste("");
      setComment("");
      fetchSakeList();
    }
  };

  // 削除
  const deleteSake = async (id) => {
    const { error } = await supabase.from("sake_list").delete().eq("id", id);
    if (error) alert("削除エラー: " + error.message);
    else fetchSakeList();
  };

  return (
    <div className="container">
      <header className="header">
        <h1>金山サルーン 日本酒編集</h1>
      </header>
      <button className="nav-btn" onClick={goList}>
        📄 一覧ページへ
      </button>

      <div className="card">
        <h3>新規追加</h3>

        <input
          className="input"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="日本酒度"
          value={abv}
          onChange={(e) => setAbv(e.target.value)}
        />

        <input
          className="input"
          placeholder="味"
          value={taste}
          onChange={(e) => setTaste(e.target.value)}
        />

        <textarea
          className="input"
          placeholder="コメント"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="refresh-btn" onClick={addSake}>
          ➕ 追加
        </button>
      </div>

      <h2 style={{ textAlign: "center", marginTop: "30px" }}>登録済み一覧</h2>

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

              <button
                className="delete-btn"
                onClick={() => deleteSake(item.id)}
              >
                🗑 削除
              </button>
            </div>
          ))}
        </div>
      )}

      <footer className="footer">© Kanayama Saloon</footer>
    </div>
  );
}
