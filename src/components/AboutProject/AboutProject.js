import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="about-project__title"> О проекте</h2>
            <ul className="about-project__items">
                <li className="about-project__item">
                    <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__text">Составление плана, работу над бэкендом,
                        вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className="about-project__item">
                    <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__text">У каждого этапа был мягкий и жёсткий
                        дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <ul className="about-project__progressbar">
                <li className="about-project__progressbar-text about-project__progressbar-text_background_blue">1 неделя</li>
                <li className="about-project__progressbar-text about-project__progressbar-text_background_gray">4 недели</li>
                <li className="about-project__progressbar-text">Back-end</li>
                <li className="about-project__progressbar-text">Front-end</li>
            </ul>
        </section>
    );
};
    
export default AboutProject;
