import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { Grid, Typography, isWidthUp, withWidth } from "@material-ui/core";
import WarningIcon from '@mui/icons-material/Warning';
import calculateSpacing from "./calculateSpacing";
import FeatureCard from "./FeatureCard";

const iconSize = 30;

export const lesions = [
  {
    color: "#820202",
    name: "melanoma",
    headline: "Melanoma",
    text:
        "El tipo más grave de cáncer de piel.\n" +
        "El melanoma ocurre cuando las células productoras de pigmento que dan color a la piel se vuelven cancerosas.",
    icon: <WarningIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#c80000",
    name: 'basal cell carcinoma',
    headline: "Basalioma",
    text:
        "Tipo de cáncer de piel que comienza en las células basales.\n" +
        "Las células basales producen nuevas células de la piel a medida que las anteriores mueren. Limitar la exposición al sol puede prevenir que estas células se tornen cancerosas.",
    icon: <WarningIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#c80000",
    name: 'squamous cell carcinoma',
    headline: "Carcinoma de Células Escamosas",
    text:
        "El carcinoma de células escamosas de la piel es una forma común de cáncer de piel que se desarrolla en las células escamosas que componen las capas media y externa de la piel. El carcinoma de células escamosas de la piel generalmente no es mortal, pero puede ser agresivo.",
    icon: <WarningIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  },
  {
    color: "#c85700",
    name: 'actinic keratosis',
    headline: "Queratosis actínica",
    text:
      "Zona áspera y escamosa de la piel ocasionada por años de exposición solar. Se debe tratar por un médico, es una condición crónica que se puede convertir en cancer.",
    icon: <WarningIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200"
  },
  {
    color: "#d6dd17",
    name: 'pigmented benign keratosis',
    headline: "Queratosis benigna",
    text:
        "Es una dermatosis relativamente frecuente, con presentación clínica en determinadas ocasiones, que puede llegar a la confusión con el melanoma. Se plantea que puede ser una lesión benigna en regresión. La dermatoscopia es de gran utilidad para la orientación diagnóstica.",
    icon: <WarningIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0"
  },

  {
    color: "#55dd00",
    name: 'dermatofibroma',
    headline: "Dermatofibroma",
    text:
      "\n" +
        "Los dermatofibromas son bultos pequeños de color rojo a marrón que se deben a una acumulación de colágeno, una proteína fabricada por las células que residen en el tejido blando bajo la piel. Es una condición muy común en la dermatología. Es benigno",
    icon: <WarningIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "200"
  },

  {
    color: "#55dd00",
    name: 'nevus',
    headline: "Nevus",
    text:
      "Los nevus son los “lunares”. Se producen porque se multiplican las células de la piel que producen la melanina. La melanina es la sustancia que da color a la piel y a las mucosas.",
    icon: <WarningIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },

  {
    color: "#55dd00",
    name: 'seborrheic keratosis',
    headline: "Queratosis seborreica",
    text:
      "Afección cutánea benigna que se manifiesta como una mancha cerosa marrón, negra o morena.\n" +
        "La queratosis seborreica es una de las neoplasias de la piel no cancerosas más comunes en los adultos de edad avanzada",
    icon: <WarningIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },

  {
    color: "#55dd00",
    name: 'vascular lesion',
    headline: "Lesión Vascular",
    text:
      "Las lesiones vasculares son anomalías relativamente comunes de la piel y los tejidos subyacentes, más comúnmente conocidas como marcas de nacimiento.",
    icon: <WarningIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  }
];

function FeatureSection(props) {
  const { width } = props;
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          Tipos de Lesiones
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width)}>
            {lesions.map(element => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={
                  isWidthUp("md", width) ? element.mdDelay : element.smDelay
                }
                key={element.headline}
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withWidth()(FeatureSection);
