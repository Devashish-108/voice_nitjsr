import React from 'react';
import "./donations.css";
import SchemeDetail from './schemeDetail';

export default function SchemeCard({name, image, link, detail}) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
      setOpen(false);
  };

  const handleOpen = () => {
      setOpen(true);
  };
  return (
    <div>
      <a className="schemeCard" href={link} onClick={handleOpen}>
        <img className="cardImage" src={image} alt="" />
        <div>
          <p className="h4 text-center"><strong>{name}</strong></p>
        </div>
      </a>
      <SchemeDetail isOpen={open}>
        <>
          <img className="cardImage" src={image} alt="" />
          <h4 style={{textDecoration:"underline"}}>{name}</h4>
          <div className="textarea">
            {/* {detail} */}
            {detail.split("\n").map((i, key) => {
                return <p key={key}>{i}</p>;
              })}
          </div>
          <button style={{marginTop:"1vh"}} onClick={handleClose}>Close</button>
        </>
      </SchemeDetail>
    </div>
  );
}