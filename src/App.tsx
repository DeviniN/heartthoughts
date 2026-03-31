import { useCallback, useMemo, useRef, useState } from "react";
import NavBar from "./components/NavBar";
import { translations, type TranslationKey } from "./constants/translations";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import type { AuthTab, Language, Page, UsersByKey } from "./types/app";
import { readFileAsDataUrl } from "./utils/files";

function App() {
  const [lang, setLang] = useState<Language>("en");
  const [dark, setDark] = useState(false);
  const [users, setUsers] = useState<UsersByKey>({});
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [authTab, setAuthTab] = useState<AuthTab>("login");
  const [page, setPage] = useState<Page>("home");

  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginErr, setLoginErr] = useState(false);

  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regAvatarData, setRegAvatarData] = useState<string | null>(null);
  const [regNameErr, setRegNameErr] = useState("");
  const [regPassErr, setRegPassErr] = useState(false);

  const [entryTitle, setEntryTitle] = useState("");
  const [entryBody, setEntryBody] = useState("");
  const [postImgData, setPostImgData] = useState<string | null>(null);

  const [profileName, setProfileName] = useState("");
  const [profileImgData, setProfileImgData] = useState<string | null>(null);
  const [profileNameErr, setProfileNameErr] = useState("");
  const [showSavedBadge, setShowSavedBadge] = useState(false);

  const postImgInputRef = useRef<HTMLInputElement>(null);

  const t = useCallback(
    (key: TranslationKey) => translations[lang][key] || key,
    [lang]
  );

  const user = useMemo(() => {
    if (!currentUser) {
      return null;
    }
    return users[currentUser] ?? null;
  }, [currentUser, users]);

  const entries = useMemo(() => user?.entries ?? [], [user]);

  const validateRegName = useCallback(
    (value: string) => {
      const cleanValue = value.trim();
      if (!cleanValue) {
        return "";
      }
      if (cleanValue.length < 3) {
        return t("name_short");
      }
      if (!/^[a-zA-Z0-9_]+$/.test(cleanValue)) {
        return t("name_chars");
      }
      if (users[cleanValue.toLowerCase()]) {
        return t("name_taken");
      }
      return "";
    },
    [t, users]
  );

  const handleRegisterAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setRegAvatarData(await readFileAsDataUrl(file));
  };

  const handlePostImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setPostImgData(await readFileAsDataUrl(file));
  };

  const handleProfileImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setProfileImgData(await readFileAsDataUrl(file));
  };

  const removePostImg = () => {
    setPostImgData(null);
    if (postImgInputRef.current) {
      postImgInputRef.current.value = "";
    }
  };

  const doRegister = () => {
    const nameError = validateRegName(regUser);
    if (nameError) {
      setRegNameErr(nameError);
      return;
    }
    if (regPass.length < 6) {
      setRegPassErr(true);
      return;
    }

    const cleanName = regUser.trim();
    const key = cleanName.toLowerCase();

    setUsers((prevUsers) => ({
      ...prevUsers,
      [key]: {
        name: cleanName,
        pass: regPass,
        imgData: regAvatarData,
        emoji: "🌸",
        entries: []
      }
    }));

    setCurrentUser(key);
    setPage("home");
    setProfileName(cleanName);
    setProfileImgData(null);
    setAuthTab("login");
    setLoginErr(false);
    setRegPassErr(false);
    setRegNameErr("");
    setRegUser("");
    setRegPass("");
  };

  const doLogin = () => {
    const key = loginUser.trim().toLowerCase();
    const matchedUser = users[key];
    if (!matchedUser || matchedUser.pass !== loginPass) {
      setLoginErr(true);
      return;
    }

    setLoginErr(false);
    setCurrentUser(key);
    setPage("home");
    setProfileName(matchedUser.name);
    setProfileImgData(null);
  };

  const doLogout = () => {
    setCurrentUser(null);
    setPage("home");
    setAuthTab("login");
    setLoginUser("");
    setLoginPass("");
    setLoginErr(false);
  };

  const submitPost = () => {
    if (!currentUser) {
      return;
    }

    const title = entryTitle.trim();
    const body = entryBody.trim();

    if (!title && !body) {
      return;
    }

    const date = new Date().toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });

    setUsers((prevUsers) => {
      const existingUser = prevUsers[currentUser];
      if (!existingUser) {
        return prevUsers;
      }

      return {
        ...prevUsers,
        [currentUser]: {
          ...existingUser,
          entries: [{ title, body, imgData: postImgData, date }, ...existingUser.entries]
        }
      };
    });

    setEntryTitle("");
    setEntryBody("");
    removePostImg();
  };

  const saveProfile = () => {
    if (!currentUser) {
      return;
    }

    const trimmedName = profileName.trim();
    if (trimmedName.length < 3) {
      setProfileNameErr(t("name_short"));
      return;
    }

    setProfileNameErr("");

    setUsers((prevUsers) => {
      const existingUser = prevUsers[currentUser];
      if (!existingUser) {
        return prevUsers;
      }

      return {
        ...prevUsers,
        [currentUser]: {
          ...existingUser,
          name: trimmedName,
          imgData: profileImgData || existingUser.imgData
        }
      };
    });

    setShowSavedBadge(true);
    window.setTimeout(() => setShowSavedBadge(false), 2500);
  };

  const handleRegUserChange = (value: string) => {
    setRegUser(value);
    setRegNameErr(validateRegName(value));
  };

  const handleRegPassChange = (value: string) => {
    setRegPass(value);
    setRegPassErr(false);
  };

  if (!user) {
    return (
      <div id="app" className={dark ? "dark" : ""}>
        <AuthPage
          authTab={authTab}
          loginUser={loginUser}
          loginPass={loginPass}
          loginErr={loginErr}
          regUser={regUser}
          regPass={regPass}
          regAvatarData={regAvatarData}
          regNameErr={regNameErr}
          regPassErr={regPassErr}
          onTabChange={setAuthTab}
          onLoginUserChange={(value) => {
            setLoginErr(false);
            setLoginUser(value);
          }}
          onLoginPassChange={(value) => {
            setLoginErr(false);
            setLoginPass(value);
          }}
          onRegUserChange={handleRegUserChange}
          onRegPassChange={handleRegPassChange}
          onRegisterAvatarChange={handleRegisterAvatarChange}
          onLogin={doLogin}
          onRegister={doRegister}
          t={t}
        />
      </div>
    );
  }

  return (
    <div id="app" className={dark ? "dark" : ""}>
      <div className="screen active" id="screen-main">
        <NavBar
          page={page}
          user={user}
          lang={lang}
          dark={dark}
          onPageChange={setPage}
          onToggleDark={() => setDark((prevValue) => !prevValue)}
          onToggleLang={() => setLang((prevValue) => (prevValue === "en" ? "ko" : "en"))}
          onLogout={doLogout}
          t={t}
        />

        {page === "home" ? (
          <HomePage
            user={user}
            entries={entries}
            entryTitle={entryTitle}
            entryBody={entryBody}
            postImgData={postImgData}
            postImgInputRef={postImgInputRef}
            onEntryTitleChange={setEntryTitle}
            onEntryBodyChange={setEntryBody}
            onPostImageChange={handlePostImgChange}
            onRemovePostImage={removePostImg}
            onSubmitPost={submitPost}
            t={t}
          />
        ) : (
          <ProfilePage
            user={user}
            profileName={profileName}
            profileImgData={profileImgData}
            profileNameErr={profileNameErr}
            showSavedBadge={showSavedBadge}
            onProfileNameChange={setProfileName}
            onProfileImgChange={handleProfileImgChange}
            onSaveProfile={saveProfile}
            t={t}
          />
        )}
      </div>
    </div>
  );
}

export default App;
