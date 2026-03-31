import type { AuthTab } from "../types/app";
import type { TranslationKey } from "../constants/translations";

interface AuthPageProps {
  authTab: AuthTab;
  loginUser: string;
  loginPass: string;
  loginErr: boolean;
  regUser: string;
  regPass: string;
  regAvatarData: string | null;
  regNameErr: string;
  regPassErr: boolean;
  onTabChange: (tab: AuthTab) => void;
  onLoginUserChange: (value: string) => void;
  onLoginPassChange: (value: string) => void;
  onRegUserChange: (value: string) => void;
  onRegPassChange: (value: string) => void;
  onRegisterAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: () => void;
  onRegister: () => void;
  t: (key: TranslationKey) => string;
}

function AuthPage({
  authTab,
  loginUser,
  loginPass,
  loginErr,
  regUser,
  regPass,
  regAvatarData,
  regNameErr,
  regPassErr,
  onTabChange,
  onLoginUserChange,
  onLoginPassChange,
  onRegUserChange,
  onRegPassChange,
  onRegisterAvatarChange,
  onLogin,
  onRegister,
  t
}: AuthPageProps) {
  return (
    <div className="screen active" id="screen-auth">
      <div className="auth-wrap">
        <div className="auth-card">
          <div className="logo">
            <div className="heart">♡</div>
            <h1>heart thoughts</h1>
            <p>{t("auth_sub")}</p>
          </div>

          <div className="tab-row">
            <button className={`tab-btn ${authTab === "login" ? "on" : ""}`} onClick={() => onTabChange("login")}>
              <span>{t("login")}</span>
            </button>
            <button className={`tab-btn ${authTab === "register" ? "on" : ""}`} onClick={() => onTabChange("register")}>
              <span>{t("register")}</span>
            </button>
          </div>

          {authTab === "login" ? (
            <div>
              <div className="form-group">
                <label>{t("lbl_username")}</label>
                <input
                  type="text"
                  value={loginUser}
                  onChange={(event) => onLoginUserChange(event.target.value)}
                  placeholder="your name..."
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label>{t("lbl_password")}</label>
                <input
                  type="password"
                  value={loginPass}
                  onChange={(event) => onLoginPassChange(event.target.value)}
                  placeholder="••••••••"
                />
                <div className={`err ${loginErr ? "show" : ""}`}>{t("login_err")}</div>
              </div>
              <button className="btn-main" onClick={onLogin}>
                {t("btn_login")}
              </button>
            </div>
          ) : (
            <div>
              <div className="avatar-pick">
                <label className="avatar-preview" htmlFor="avatar-input">
                  {regAvatarData ? <img src={regAvatarData} alt="avatar preview" /> : <span>🌸</span>}
                </label>
                <div className="avatar-pick-info">
                  <label className="avatar-pick-label" htmlFor="avatar-input">
                    {t("pick_icon")}
                  </label>
                  <span className="avatar-pick-hint">optional profile photo</span>
                </div>
              </div>
              <input id="avatar-input" type="file" accept="image/*" onChange={onRegisterAvatarChange} />

              <div className="form-group">
                <label>{t("lbl_reg_name")}</label>
                <input
                  type="text"
                  value={regUser}
                  onChange={(event) => onRegUserChange(event.target.value)}
                  placeholder="choose a name..."
                  autoComplete="off"
                />
                <div className={`err ${regNameErr ? "show" : ""}`}>{regNameErr}</div>
              </div>

              <div className="form-group">
                <label>{t("lbl_reg_pass")}</label>
                <input
                  type="password"
                  value={regPass}
                  onChange={(event) => onRegPassChange(event.target.value)}
                  placeholder="at least 6 characters"
                />
                <div className={`err ${regPassErr ? "show" : ""}`}>{t("pass_short")}</div>
              </div>

              <button className="btn-main" onClick={onRegister}>
                {t("btn_reg")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
