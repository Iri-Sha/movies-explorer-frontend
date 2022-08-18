import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__title">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
            <div className="footer__info">
                <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                <div className="footer__list">
                    <a href="https://practicum.yandex.ru/" className="footer__link" target="_blank" rel="noreferrer">
                        Яндекс.Практикум
                    </a>
                    <a href="https://github.com/" className="footer__link" target="_blank" rel="noreferrer">
                        Github
                    </a>
                </div>
            </div>

        </footer>
    );
};
    
export default Footer;