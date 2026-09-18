import styles from "./TopArticle.module.css";
import react from "../assets/react.svg";

export default function TopArticle({ title, content, imageUrl }) {
    return (
        <article data-theme="retro">
            <button className="btn btn-primary">WOW</button>
            <h2>{title}</h2>
            <img src={react} />
            <img src={imageUrl} />
            <p className={styles.text}>{content}</p>
        </article>
    );
}
