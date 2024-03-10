import React from "react";

const gallery = ({ memes, topText, bottomText, handleChange }) => {
  return (
    <div className="col-md-3 p-3 position-fixed h-100  bg-white border sticky-md-bottom overflow-y-auto ">
      {/* <span className="text-secondary">Vos designs les plus récents</span> */}
      <div>
        <p className="text-Primary fw-bold text-center fs-6 m-0 ">Media</p>
        <form className="meme-form w-100">
          <div className="d-flex flex-wrap justify-content-center gap-3 align-items-end">
            <div className=" w-100 ">
              <p className="fw-bold fs-6 m-0 mb-1">AJouter du texte en haut</p>
              <input
                type="text"
                name="topText"
                placeholder="texte du haut"
                value={topText}
                onChange={handleChange}
                className="p-2 rounded border w-100"
              />
            </div>
            <div className=" w-100 ">
              <p className="fw-bold fs-6 m-0 mb-1">AJouter du texte en bas</p>
              <input
                type="text"
                name="bottomText"
                placeholder="texte du bas"
                value={bottomText}
                onChange={handleChange}
                className="p-2 rounded border w-100"
              />
            </div>
          </div>
        </form>
      </div>
      <p className="text-Primary fw-bold text-center fs-6 m-0 mt-3">Gallerie</p>
      <div className="gallery d-flex flex-wrap gap-2 p-2 justify-content-center">
        {memes.length === 0 ? (
          <p className="text-secondary">Aucun meme récent</p>
        ) : (
          memes.map((meme) => (
            <div key={meme.id} className="meme-item">
              <img src={meme.url} alt="Meme" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default gallery;
