import React, { useState } from "react";
import { Navbar, Footer } from "../../components";
import "./user.css";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
function User() {
  const [link, setLink] = useState("");
  const [linkInfo, setLinkInfo] = useState(null);
  const [status, setStatus] = useState(null);
  const { user } = useSelector((state) => ({ ...state.auth }));
  React.useEffect(() => {
    document.title = `Dashboard || ${user?.result?.username}`;
  }, [user]);

  //shortenUrl

  const shortenURL = (e) => {
    e.preventDefault();
    setLinkInfo(null);

    if (!link) {
      setStatus({ error: true, info: "Please provide your Link!" });
      return;
    }

    const providedLink = link;
    setLink("");
    setStatus("Loading");

    fetch(`https://api.shrtco.de/v2/shorten?url=${providedLink}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setLinkInfo(data);
          setStatus(null);
        } else
          setStatus({
            error: true,
            info: "Please add a valid link!",
          });
      })
      .catch((err) => {
        setStatus({ error: true, info: "Unknown Error Occured!" });
      });
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="shortener">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <h2>
              Welcome {user?.result?.username}, Let's begin shortening those
              links.
            </h2>
          </div>
          <form className="shortener__box">
            <input
              title="URL Input"
              aria-label="Please provide your URL"
              onChange={(e) => setLink(e.target.value)}
              className="shorten__inp input__wdth mb__remove"
              type="text"
              name="url"
              placeholder="Shorten a link here..."
              value={link}
            />
            <button
              disabled={status === "Loading"}
              type="submit"
              onClick={shortenURL}
              className="action__btn"
            >
              {status === "Loading" && (
                <ThreeDots
                  height="20"
                  width="20"
                  color="white"
                  ariaLabel="loading"
                />
              )}

              <span style={{ marginLeft: "10px" }}>Shorten it!</span>
            </button>
          </form>

          {linkInfo && <Shortened linkInfo={linkInfo} />}

          {status === "Loading" && (
            <div className="loading">
              <span>Just a moment...</span>
            </div>
          )}

          {status?.error && (
            <div className="error">
              {status.info} <span onClick={() => setStatus(null)}>&times;</span>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

const Shortened = ({ linkInfo }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    try {
      navigator.clipboard
        .writeText(linkInfo.result.full_short_link)
        .then(setCopied(true))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="shortened">
        <div className="base__url">
          <h4>{linkInfo.result.original_link}</h4>
        </div>
        <div className="shortened__rslt">
          <h4 id="rslt__url" className="rslt__url">
            {linkInfo.result.full_short_link}
          </h4>

          {navigator.clipboard !== undefined && (
            <button
              disabled={copied}
              onClick={handleCopy}
              className={`action__btn copy ${copied && "copied"}`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default User;
