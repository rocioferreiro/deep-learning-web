import React, {useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  isWidthUp,
  withWidth,
  withStyles
} from "@material-ui/core";
import PriceCard from "./PriceCard";
import calculateSpacing from "./calculateSpacing";
import {CircularProgress} from "@mui/material";

const styles = theme => ({
  containerFix: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6)
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    overflow: "hidden",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  cardWrapper: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 340
    }
  },
  cardWrapperHighlighted: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 360
    }
  }
});

function PricingSection(props) {
  const { width, classes, result, ref } = props;

  return (
    <div ref={ref} className="lg-p-top" id={'result'} style={{ backgroundColor: "#FFFFFF" }}>
      <Typography variant="h3" align="center" className="lg-ms-bottom">
        Resultados
      </Typography>
      { result ?
          <div>
            <Typography variant="h5" align="center">
              {result.doctor? 'Deberías consultar con un médico esa lesion' : 'Parece no ser nada! Recomendamos consultar con un médico de todas formas'}
            </Typography>

            <div className={classNames("container-fluid", classes.containerFix)}>
              <Grid
                container
                spacing={calculateSpacing(width)}
                className={classes.gridContainer}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                  className={classes.cardWrapper}
                  data-aos="zoom-in-up"
                >
                </Grid>

                <Grid
                  item
                  className={classes.cardWrapperHighlighted}
                  xs={12}
                  sm={6}
                  lg={3}
                  data-aos="zoom-in-up"
                  data-aos-delay="200"
                >
                  <a href={'#features'} style={{textDecoration: 'none'}}>
                  <PriceCard
                      order={"1ro"}
                    highlighted
                    title={result.predictions.map((i) => Object.keys(i)[0])[0]}
                    pricing={
                      <span>
                        {result.predictions.map((i) => Object.keys(i)[0])[0]}
                        {/*<Typography display="inline"> / month</Typography>*/}
                      </span>
                    }
                    features={result.predictions.map((i) => Object.keys(i)[0]).slice(0,1)}
                  />
                  </a>
                </Grid>


                <Grid
                  item
                  className={classes.cardWrapper}
                  xs={12}
                  sm={6}
                  lg={3}
                  data-aos="zoom-in-up"
                  data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
                >
                  <a href={'#features'} style={{textDecoration: 'none', color: '#4b4b4b'}}>
                  <PriceCard
                      order={"2do"}
                    title={result.predictions.map((i) => Object.keys(i)[0])[1]}
                    pricing={
                      <span>
                        {result.predictions.map((i) => Object.keys(i)[0])[1]}
                        {/*<Typography display="inline"> / month</Typography>*/}
                      </span>
                    }
                    features={result.predictions.map((i) => Object.keys(i)[0]).slice(0,1)}
                  />
                  </a>
                </Grid>
              </Grid>

            </div>
          </div>
          :
          <div style={{width: '100%', display: 'flex', justifyContent: 'center', height: 300, alignItems: 'center'}}>
            <Typography variant="h5" align="center" color={'#f1f1f1'}>
              Para ver esta sección tenes que subir una imagen.
            </Typography>
          </div>
      }
    </div>

  );
}

PricingSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(
  withWidth()(PricingSection)
);
