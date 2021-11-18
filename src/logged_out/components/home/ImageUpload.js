import React, {useEffect, useState} from "react";
import { FileUploader } from "react-drag-drop-files";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CardActionArea from "@mui/material/CardActionArea";

const fileTypes = ["JPG", "JPEG","PNG"];

const ImageUpload = ({file, setFile}) => {

    const [display, setDisplay] = useState(null);

    useEffect(() => {
        if(!file) {
            setDisplay(null)
        }
    }, [file])

  const handleChange = (file) => {
      setFile(file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
          setDisplay(reader.result);
      };
  };

  const imageResetHandler = () => {
    setFile(null)
    setDisplay(null)
  };

  return (
      display? <div>
            <CardActionArea onClick={imageResetHandler}>
              <ArrowBackIosNewIcon/>
            </CardActionArea>
            <img
                width="100%"
                //className={classes.media}
                src={display}
                alt={'alt'}
            />
      </div> :
    <FileUploader
      className={'file-upload'}
      handleChange={handleChange}
      name="file"
      types={fileTypes}
    />
  );
}

export default ImageUpload;
