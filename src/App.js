import "./App.scss";
import * as React from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";

function App() {
        const { register, getValues } = useForm({
                defaultValues: {
                        input: "",
                },
        });

        const [start, setStart] = React.useState(false);

        const exceptLangDefault = {
                jp: false,
                en: false,
                vi: false,
                picked: false,
        };
        const [exceptLang, setExceptLang] = React.useState({
                ...exceptLangDefault,
        });

        const handlePickLanguage = (language) => {
                const newExcept = { ...exceptLangDefault };
                newExcept[language] = true;
                newExcept.picked = true;
                setExceptLang({ ...newExcept });
        };

        const handleStart = () => {
                if (exceptLang.picked) {
                        learnReset();
                        setStart(true);
                }
        };

        const wordsDefault = [
                { en: "1", jp: "11", vi: "111" },
                { en: "2", jp: "22", vi: "222" },
                { en: "3", jp: "33", vi: "333" },
                { en: "4", jp: "44", vi: "444" },
                { en: "5", jp: "55", vi: "555" },
                { en: "6", jp: "66", vi: "666" },
                { en: "7", jp: "77", vi: "777" },
                { en: "8", jp: "88", vi: "888" },
                { en: "9", jp: "99", vi: "999" },
                { en: "10", jp: "1010", vi: "101010" },
        ];
        const [words, setWords] = React.useState([...wordsDefault]);
        const [count, setCount] = React.useState(0);

        const learnReset = () => {
                setWords([...wordsDefault]);
                setStart(false);
                setCount(0);
        };

        const handleSubmit = () => {
                const input = getValues("input");
                if (exceptLang.jp && input === word.jp) {
                        setCount(count + 1);
                        if (count + 1 === words.length) {
                                setStart(false);
                                return;
                        } else {
                                setWords(words.filter((w) => w !== word));
                                wordChange();
                        }
                }

                if (exceptLang.vi && input === word.vi) {
                        setCount(count + 1);
                        if (count + 1 === words.length) {
                                setStart(false);
                                return;
                        } else {
                                setWords(words.filter((w) => w !== word));
                                wordChange();
                        }
                }

                if (exceptLang.en && input === word.en) {
                        setCount(count + 1);
                        if (count + 1 === words.length) {
                                setStart(false);
                                return;
                        } else {
                                setWords(words.filter((w) => w !== word));
                                wordChange();
                        }
                }
        };

        let word = words ? _.sample(words) : _.sample(wordsDefault);

        const wordChange = () => {
                if (count + 1 <= words.length) {
                        word = _.sample(words);
                        return;
                }
                word = _.sample(wordsDefault);
        };

        return (
                <div className="app">
                        <div className="card text-center">
                                {word && start ? (
                                        <React.Fragment>
                                                {
                                                        <div className="container">
                                                                <div className="row">
                                                                        <div className="col-sm gy-5">
                                                                                <div className="row">
                                                                                        <label
                                                                                                className={`btn btn-${
                                                                                                        exceptLang.jp ? "secondary" : "primary"
                                                                                                }`}
                                                                                                htmlFor="jp"
                                                                                                style={{ width: "100%" }}
                                                                                        >
                                                                                                JP
                                                                                                {exceptLang.jp ? (
                                                                                                        <input
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                ref={register}
                                                                                                                name="input"
                                                                                                                style={{ width: "100%" }}
                                                                                                                id="jp"
                                                                                                        />
                                                                                                ) : (
                                                                                                        <h3 className="form-control">{word.jp}</h3>
                                                                                                )}
                                                                                        </label>
                                                                                </div>
                                                                                <div className="row">
                                                                                        <label
                                                                                                style={{ width: "100%" }}
                                                                                                className={`btn btn-${
                                                                                                        exceptLang.vi ? "secondary" : "primary"
                                                                                                }`}
                                                                                                htmlFor="vi"
                                                                                        >
                                                                                                VI
                                                                                                {exceptLang.vi ? (
                                                                                                        <input
                                                                                                                id="vi"
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                ref={register}
                                                                                                                name="input"
                                                                                                        />
                                                                                                ) : (
                                                                                                        <h3 className="form-control">{word.vi}</h3>
                                                                                                )}
                                                                                        </label>
                                                                                </div>
                                                                                <div className="row">
                                                                                        <label
                                                                                                style={{ width: "100%" }}
                                                                                                className={`btn btn-${
                                                                                                        exceptLang.en ? "secondary" : "primary"
                                                                                                }`}
                                                                                                htmlFor="en"
                                                                                        >
                                                                                                EN
                                                                                                {exceptLang.en ? (
                                                                                                        <input
                                                                                                                id="en"
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                ref={register}
                                                                                                                name="input"
                                                                                                        />
                                                                                                ) : (
                                                                                                        <h3 className="form-control">{word.en}</h3>
                                                                                                )}
                                                                                        </label>
                                                                                </div>
                                                                        </div>
                                                                        <div className="col-sm">
                                                                                <div className="row btn btn-success" style={{ width: "100%" }}>
                                                                                        Correct answer: {count}
                                                                                </div>
                                                                                <button
                                                                                        type="button"
                                                                                        className="row btn btn-success"
                                                                                        style={{ width: "100%" }}
                                                                                        onClick={() => handleSubmit()}
                                                                                >
                                                                                        Submit
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                }
                                        </React.Fragment>
                                ) : (
                                        <React.Fragment>
                                                <h3>Pick one language to hide</h3>
                                                <div>
                                                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                                                                <button
                                                                        type="button"
                                                                        className={`btn btn-outline-primary ${exceptLang.jp ? "active" : ""}`}
                                                                        onClick={() => handlePickLanguage("jp")}
                                                                >
                                                                        Japanese
                                                                </button>
                                                                <button
                                                                        type="button"
                                                                        className={`btn btn-outline-primary ${exceptLang.vi ? "active" : ""}`}
                                                                        onClick={() => handlePickLanguage("vi")}
                                                                >
                                                                        Vietnamese
                                                                </button>
                                                                <button
                                                                        type="button"
                                                                        className={`btn btn-outline-primary ${exceptLang.en ? "active" : ""}`}
                                                                        onClick={() => handlePickLanguage("en")}
                                                                >
                                                                        English
                                                                </button>
                                                        </div>
                                                </div>
                                                <div>
                                                        <button className="btn btn-primary" onClick={() => handleStart()}>
                                                                Start
                                                        </button>
                                                </div>
                                        </React.Fragment>
                                )}
                        </div>
                </div>
        );
}

export default App;
