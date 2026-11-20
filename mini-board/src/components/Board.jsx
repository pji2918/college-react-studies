import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Board({ user }) {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    const loadPosts = useCallback(async (signal) => {
        setLoading(true);
        setError("");
        try {
            let query = supabase
                .from("posts")
                .select("id, user_id, title, content, created_at")
                .order("created_at", { ascending: false })
                .limit(50);
            if (signal) query = query.abortSignal(signal);
            const { data, error } = await query;
            if (signal?.aborted) return;
            if (error) throw error;
            setPosts(data);
        } catch (err) {
            if (!signal?.aborted)
                setError(
                    err instanceof Error
                        ? err.message
                        : "요청 처리 중 오류가 발생했습니다.",
                );
        } finally {
            if (!signal?.aborted) setLoading(false);
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        loadPosts(controller.signal);
        return () => controller.abort();
    }, [loadPosts]);

    function resetForm() {
        setEditingId(null);
        setTitle("");
        setContent("");
    }

    async function savePost(event) {
        event.preventDefault();
        if (busy) return;
        const values = { title: title.trim(), content: content.trim() };
        if (!values.title || !values.content) {
            setError("제목과 내용을 공백 없이 입력하세요.");
            return;
        }
        setBusy(true);
        setError("");
        setNotice("");
        try {
            const query = editingId
                ? supabase
                      .from("posts")
                      .update(values)
                      .eq("id", editingId)
                      .eq("user_id", user.id)
                : supabase
                      .from("posts")
                      .insert({ ...values, user_id: user.id });
            // 수정 대상이 없거나 권한 때문에 0행이 되면 single()이 오류를 반환합니다.
            const { error } = await query.select("id").single();
            if (error) throw error;
            setNotice(editingId ? "글을 수정했습니다." : "글을 등록했습니다.");
            resetForm();
            await loadPosts();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "요청 처리 중 오류가 발생했습니다.",
            );
        } finally {
            setBusy(false);
        }
    }

    function startEdit(post) {
        setEditingId(post.id);
        setTitle(post.title);
        setContent(post.content);
        setError("");
        setNotice("");
        document.getElementById("post-title")?.focus();
    }

    async function deletePost(post) {
        if (busy || !window.confirm("이 글을 삭제할까요?")) return;
        setBusy(true);
        setError("");
        setNotice("");
        try {
            const { error } = await supabase
                .from("posts")
                .delete()
                .eq("id", post.id)
                .eq("user_id", user.id)
                .select("id")
                .single();
            if (error) throw error;
            if (editingId === post.id) resetForm();
            setNotice("글을 삭제했습니다.");
            await loadPosts();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "요청 처리 중 오류가 발생했습니다.",
            );
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <section className="card">
                <h2>{editingId ? "글 수정" : "새 글 쓰기"}</h2>
                <form onSubmit={savePost}>
                    <fieldset disabled={busy || loading}>
                        <label htmlFor="post-title">제목</label>
                        <input
                            id="post-title"
                            required
                            maxLength={100}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="post-content">내용</label>
                        <textarea
                            id="post-content"
                            required
                            maxLength={5000}
                            rows={5}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className="actions">
                            <button type="submit">
                                {busy
                                    ? "처리 중…"
                                    : editingId
                                      ? "수정 저장"
                                      : "등록"}
                            </button>
                            {editingId && (
                                <button type="button" onClick={resetForm}>
                                    취소
                                </button>
                            )}
                        </div>
                    </fieldset>
                </form>
            </section>
            {error && (
                <p role="alert" className="error">
                    {error}
                </p>
            )}
            {notice && <p role="status">{notice}</p>}
            <section aria-label="게시글 목록">
                <div className="topbar">
                    <h2>최근 게시글 · 최대 50개</h2>
                    <button
                        onClick={() => loadPosts()}
                        disabled={loading || busy}
                    >
                        새로고침
                    </button>
                </div>
                {loading ? (
                    <p role="status">불러오는 중…</p>
                ) : posts.length === 0 ? (
                    <p>아직 게시글이 없습니다.</p>
                ) : (
                    posts.map((post) => (
                        <article className="card" key={post.id}>
                            <h3>{post.title}</h3>
                            <small>
                                {post.user_id === user.id ? "내 글" : "회원 글"}{" "}
                                ·{" "}
                                {new Date(post.created_at).toLocaleString(
                                    "ko-KR",
                                )}
                            </small>
                            <p className="post-content">{post.content}</p>
                            {post.user_id === user.id && (
                                <div className="actions">
                                    <button
                                        onClick={() => startEdit(post)}
                                        disabled={busy}
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => deletePost(post)}
                                        disabled={busy}
                                    >
                                        삭제
                                    </button>
                                </div>
                            )}
                        </article>
                    ))
                )}
            </section>
        </>
    );
}
