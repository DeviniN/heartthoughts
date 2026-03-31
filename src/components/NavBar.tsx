import type { Language, Page, UserRecord } from "../types/app";
import type { TranslationKey } from "../constants/translations";

interface NavBarProps {
  page: Page;
  user: UserRecord;
  lang: Language;
  dark: boolean;
  onPageChange: (nextPage: Page) => void;
  onToggleDark: () => void;
  onToggleLang: () => void;
  onLogout: () => void;
  t: (key: TranslationKey) => string;
}

function NavBar({ page, user, lang, dark, onPageChange, onToggleDark, onToggleLang, onLogout, t }: NavBarProps) {
  return (
    <nav>
      <div className="nav-logo">♡ <span>heart</span> thoughts</div>
      <div className="nav-links">
        <button className={`nav-link ${page === "home" ? "on" : ""}`} onClick={() => onPageChange("home")}>
          {t("nav_home")}
        </button>
        <button className={`nav-link ${page === "profile" ? "on" : ""}`} onClick={() => onPageChange("profile")}>
          {t("nav_profile")}
        </button>
        <button className="nav-link" onClick={onLogout}>
          {t("nav_exit")}
        </button>
      </div>
      <div className="nav-right">
        <button className="toggle-pill" onClick={onToggleDark}>
          <span className="tog-icon">{dark ? "☽" : "☀"}</span>
          <span>{dark ? t("dark") : t("light")}</span>
        </button>
        <button className="toggle-pill" onClick={onToggleLang}>
          <span className="tog-icon">🌐</span>
          <span>{lang === "en" ? "EN" : "KO"}</span>
        </button>
        <button className="nav-avatar" onClick={() => onPageChange("profile")}>
          {user.imgData ? <img src={user.imgData} alt="avatar" /> : <span>{user.emoji || "🌸"}</span>}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
