import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {parseGithubProfile, parseUserRepos} from './store/github/githubSlice.js'
import Loader from "./components/Loader.jsx";


function App() {
    const dispatch = useDispatch()
    const {profile, repos} = useSelector((state) => state.github)
    const [username, setUsername] = useState('')
    const [method, setMethod] = useState('')
    console.log(method)
    const formSub = (event) => {
        event.preventDefault();
        dispatch(parseGithubProfile(username));
        dispatch(parseUserRepos(username));
    }
    const sortRepos = (repos, method) => {
        return [...repos].sort((a, b) => {
            switch (method) {
                case 'stars':
                    return b.stargazers_count - a.stargazers_count
                case 'date':
                    return new Date(b.created_at) - new Date(a.created_at);
                default:
                    return a.full_name.split('/')[1].localeCompare(b)

            }
        })
    }
    useEffect(() => {
        setTimeout(() => dispatch(parseGithubProfile('Kroklik'),
            dispatch(parseUserRepos('Kroklik'))), 500)
    }, [dispatch]);

    return (
        <>
            <div className="wrapper">
                {profile ? (
                    <>
                        <nav className="nav">
                            <a href="#" className="index-link">github finder</a>
                        </nav>
                        <div className="container">
                            <form
                                onSubmit={(event) => {
                                    formSub(event)
                                }}
                            >
                                <div className="search-bar">
                                    <input
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        type="text"
                                        placeholder="Введите имя пользователя"
                                        className="search-input"
                                    />
                                    <button className="search-button">НАЙТИ</button>
                                </div>
                            </form>
                            <div className="user-profile">
                                <div className="user-avatar-container">
                                    <img
                                        src={profile.avatar_url}
                                        className="user-avatar"
                                        alt='ava'
                                    />
                                    <button
                                        className="visit-button"
                                        onClick={() => window.open(profile.html_url, "_blank")}>
                                        ПОСЕТИТЬ
                                    </button>
                                </div>
                                <div className="user-info">
                                    <p>{profile.login}</p>
                                    <p>Репозитории: {profile.public_repos}</p>
                                    <p>Создан: {profile.created_at}</p>
                                    <p>Подписчиков: {profile.followers}</p>
                                    <p>Подписок: {profile.following}</p>
                                </div>
                            </div>
                            <div className="sort-section">
                                <p className="sort-label">Сортировка</p>
                                <div className="sort-options">
                                    <button className="sort-button" onClick={() => setMethod('')}>ИМЯ</button>
                                    <button className="sort-button" onClick={() => setMethod('stars')}>ЗВЕЗДЫ</button>
                                    <button className="sort-button" onClick={() => setMethod('date')}>ДАТА</button>
                                </div>
                            </div>
                            {repos ? (
                                <div className="repos-list">
                                    {sortRepos(repos, method).map((repo) => (
                                        <div key={repo.id} className="repo-card">
                                            <div className="repo-info">
                                                <p className="repo-name">{repo.full_name.split('/')[1]}</p>
                                                <p>Количество звезд: {repo.stargazers_count}</p>
                                                <p>Дата добавления: {repo.created_at}</p>
                                            </div>
                                            <button className="visit-repo-button"
                                                    onClick={() => window.open(repo.html_url, "_blank")}>ПОСЕТИТЬ
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )
                                : <p>Репозитории загружаются</p>

                            }


                        </div>
                    </>
                ) : (
                    <Loader/>
                )}

            </div>
        </>
    )
}

export default App
