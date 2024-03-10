import React, { Component } from "react";
import Gallery from "./Gallery";
import Header from "./Header";

class MemeGenerator extends Component {
  state = {
    topText: "",
    bottomText: "",
    randomImg: "",
    randomImgLink: "",
    allMemeImgs: [],
    recentMemes: [],
  };

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        const { memes } = data.data;
        this.setState({ allMemeImgs: memes });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { allMemeImgs } = this.state;
    const randomImg =
      allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)].url;
    this.setState({ randomImg });
  };

  handleDownload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      ctx.fillStyle = "white";
      ctx.font = "30px Impact";
      ctx.textAlign = "center";

      ctx.fillText(this.state.topText, canvas.width / 2, 50);
      ctx.fillText(this.state.bottomText, canvas.width / 2, canvas.height - 20);

      const dataUrl = canvas.toDataURL("image/png");

      // Create an anchor element for downloading
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = dataUrl;
      document.body.appendChild(link);

      link.click();

      // Remove the anchor element from the document body
      document.body.removeChild(link);

      const newMeme = {
        id: Math.random().toString(36).substring(7),
        url: dataUrl,
      };

      this.setState((prevState) => ({
        recentMemes: [...prevState.recentMemes, newMeme],
      }));
      this.setState({ randomImgLink: dataUrl });
    };

    img.src = this.state.randomImg;
  };

  handleReset = () => {
    this.setState({ randomImg: "" });
  };

  handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        this.state.randomImg
      )}`,
      "_blank"
    );
  };

  handleWhatsAppShare = () => {
    window.open(
      `https://api.whatsapp.com/send?text=Check out this meme: ${encodeURIComponent(
        this.state.randomImg
      )}`,
      "_blank"
    );
  };

  handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        this.state.randomImg
      )}&text=Check out this meme!`,
      "_blank"
    );
  };

  render() {
    const { topText, bottomText, randomImg } = this.state;

    return (
      <div className="after-header row p-0 mx-0 ">
        <Gallery
          memes={this.state.recentMemes}
          topText={topText}
          bottomText={bottomText}
          handleChange={this.handleChange}
        />
        <div className="col-md-9 d-flex flex-column align-items-center  ms-md-auto">
          <Header />
          <div className=" mt-3 d-flex justify-content-between w-100">
            <h1 className="text-center text-black fs-5 fw-bold">
              Créez un nouveau meme
            </h1>
            <button
              onClick={this.handleSubmit}
              className="p-2 px-4 rounded border btn generate-btn"
            >
              Génerer
            </button>
          </div>
          {randomImg && (
            <>
              <div className="meme mt-3">
                <img src={randomImg} alt="meme" />
                <h2 className="top">{topText}</h2>
                <h2 className="bottom">{bottomText}</h2>
              </div>
              <div className="mt-4 d-flex w-100 gap-3 justify-content-center align-items-center">
                <button
                  onClick={this.handleReset}
                  className="p-2 px-3 rounded border btn"
                >
                  Retablir
                </button>
                <button
                  onClick={this.handleDownload}
                  className="p-2 px-3 rounded border btn generate-btn"
                >
                  Télécharger
                </button>

                <div className="d-flex gap-2">
                  <i
                    onClick={this.handleFacebookShare}
                    className="fa fa-facebook-official fs-3"
                    style={{ color: "#316FF6" }}
                  ></i>
                  <i
                    onClick={this.handleTwitterShare}
                    className="fa fa-twitter-square fs-3"
                    style={{ color: "#34B7F1" }}
                  ></i>
                  <i
                    onClick={this.handleWhatsAppShare}
                    className="fa fa-whatsapp fs-3"
                    style={{ color: "#075e54" }}
                  ></i>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
