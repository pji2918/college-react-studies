import styles from "./Article.module.css";

export default function Article({ title, content }) {
    return (
        <article>
            <button className="btn btn-primary">WOW</button>
            <h2 className={styles.text}>{title}</h2>
            <p className={styles.contentText}>{content}</p>
        </article>
    );
}
