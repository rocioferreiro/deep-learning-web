import React from "react";
import { FileUploader } from "react-drag-drop-files";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CardActionArea from "@mui/material/CardActionArea";

const fileTypes = ["JPG", "PNG"];

const ImageUpload = ({file, setFile}) => {

  const handleChange = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
          console.log(reader.result)
          setFile(reader.result);
      };

  };

  const imageResetHandler = () => {
    setFile(null)
  };

  return (
      file? <div>
            <CardActionArea onClick={imageResetHandler}>
              <ArrowBackIosNewIcon/>
            </CardActionArea>
            <img
                width="100%"
                //className={classes.media}
                src={file}
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
