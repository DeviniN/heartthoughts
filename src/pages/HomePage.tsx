import Avatar from "../components/Avatar";
import type { Entry, UserRecord } from "../types/app";
import type { TranslationKey } from "../constants/translations";

interface HomePageProps {
  user: UserRecord;
  entries: Entry[];
  entryTitle: string;
  entryBody: string;
  postImgData: string | null;
  postImgInputRef: React.RefObject<HTMLInputElement>;
  onEntryTitleChange: (value: string) => void;
  onEntryBodyChange: (value: string) => void;
  onPostImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePostImage: () => void;
  onSubmitPost: () => void;
  t: (key: TranslationKey) => string;
}

function HomePage({
  user,
  entries,
  entryTitle,
  entryBody,
  postImgData,
  postImgInputRef,
  onEntryTitleChange,
  onEntryBodyChange,
  onPostImageChange,
  onRemovePostImage,
  onSubmitPost,
  t
}: HomePageProps) {
  return (
    <div className="main-wrap">
      <div className="profile-banner">
        <Avatar imgData={user.imgData} emoji={user.emoji} className="banner-av" />
        <div className="banner-info">
          <h2>{user.name}</h2>
          <p>{t("banner_sub")}</p>
        </div>
      </div>

      <div className="compose-card">
        <h3>{t("compose_title")}</h3>
        <input
          type="text"
          value={entryTitle}
          onChange={(event) => onEntryTitleChange(event.target.value)}
          placeholder={t("ph_title")}
        />
        <textarea
          value={entryBody}
          onChange={(event) => onEntryBodyChange(event.target.value)}
          placeholder={t("ph_body")}
        />

        {postImgData && (
          <div className="img-preview-wrap" style={{ display: "inline-block" }}>
            <img src={postImgData} alt="preview" />
            <button className="remove-img" onClick={onRemovePostImage}>
              ×
            </button>
          </div>
        )}

        <div className="compose-actions">
          <label className="img-label" htmlFor="post-img-input">
            <span>🖼</span>
            <span>{t("add_img")}</span>
          </label>
          <input id="post-img-input" ref={postImgInputRef} type="file" accept="image/*" onChange={onPostImageChange} />
          <button className="btn-post" onClick={onSubmitPost}>
            {t("btn_post")}
          </button>
        </div>
      </div>

      <div className="entries-header">{t("entries_header")}</div>
      <div>
        {!entries.length ? (
          <div className="empty-state">
            <div className="big">🌸</div>
            <p className="empty-title">{t("empty_title")}</p>
            <p className="empty-sub">{t("empty_sub")}</p>
          </div>
        ) : (
          entries.map((entry, index) => (
            <div className="entry-card" key={`${entry.date}-${index}`}>
              <div className="entry-top">
                <div className="entry-av">
                  {user.imgData ? <img src={user.imgData} alt="avatar" /> : <span>{user.emoji || "🌸"}</span>}
                </div>
                <div className="entry-meta">
                  <h4>{user.name}</h4>
                  <div className="entry-date">{entry.date}</div>
                </div>
              </div>
              {entry.title ? <div className="entry-title">{entry.title}</div> : null}
              {entry.body ? <div className="entry-body">{entry.body}</div> : null}
              {entry.imgData ? <img className="entry-img" src={entry.imgData} alt="entry" /> : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
