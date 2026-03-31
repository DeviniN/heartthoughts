import type { UserRecord } from "../types/app";
import type { TranslationKey } from "../constants/translations";

interface ProfilePageProps {
  user: UserRecord;
  profileName: string;
  profileImgData: string | null;
  profileNameErr: string;
  showSavedBadge: boolean;
  onProfileNameChange: (value: string) => void;
  onProfileImgChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveProfile: () => void;
  t: (key: TranslationKey) => string;
}

function ProfilePage({
  user,
  profileName,
  profileImgData,
  profileNameErr,
  showSavedBadge,
  onProfileNameChange,
  onProfileImgChange,
  onSaveProfile,
  t
}: ProfilePageProps) {
  return (
    <div className="profile-wrap">
      <div className="profile-section-title">{t("profile_title")}</div>
      <div className="profile-card">
        <div className="profile-av-row">
          <label className="profile-av-big" htmlFor="profile-img-input">
            {profileImgData || user.imgData ? <img src={profileImgData || user.imgData || ""} alt="profile" /> : <span>{user.emoji || "🌸"}</span>}
          </label>
          <label className="profile-av-hint" htmlFor="profile-img-input">
            {t("lbl_change_photo")}
          </label>
          <input id="profile-img-input" type="file" accept="image/*" onChange={onProfileImgChange} />
        </div>

        <div className="form-group">
          <label>{t("lbl_change_name")}</label>
          <input type="text" value={profileName} onChange={(event) => onProfileNameChange(event.target.value)} placeholder="your name..." />
          <div className={`err ${profileNameErr ? "show" : ""}`}>{profileNameErr}</div>
        </div>

        <button className="btn-save" onClick={onSaveProfile}>
          {t("btn_save")}
        </button>
        <div className={`saved-badge ${showSavedBadge ? "show" : ""}`}>{t("saved")}</div>
      </div>
    </div>
  );
}

export default ProfilePage;
