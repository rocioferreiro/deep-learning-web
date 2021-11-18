import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Typography, Box, withStyles } from "@material-ui/core";
import {lesions} from "./FeatureSection";
import shadeColor from "../../../shared/functions/shadeColor";

const styles = theme => ({
  card: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(2),
    border: `3px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius * 2,
  },
  cardHightlighted: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    border: `3px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2)
    }
  },
  title: {
    color: "#4b4b4b"
  }
});

function PriceCard(props) {
  const { classes, order, title, features, highlighted } = props;
  const [lesion, setLesion] = useState();

  useEffect(() => {
    setLesion(lesions.filter(i => i.name === title)[0])
  }, [title])
  return ( lesion ?
    <div className={highlighted ? classes.cardHightlighted : classes.card}
         style={highlighted ?
          {backgroundColor: shadeColor(lesion.color, 0.5), borderColor: lesion.color}
             :
          {borderColor: lesion.color}
         }>
      <Box mb={2}>
        <Typography
          variant={highlighted ? "h4" : "h6"}
          style={highlighted ? {color: shadeColor(lesion.color, -0.5)} : {color: '#4b4b4b'}}
        >
          {order}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography
          variant={highlighted ? "h4" : "h5"}
          className={highlighted ? "text-white" : null}
        >
          {lesion.headline}
        </Typography>
      </Box>
      {features.map((feature, index) => (
        <Box display="flex" alignItems="center" mb={1} key={index}>
          {/*<CheckIcon*/}
          {/*  style={{*/}
          {/*    color: highlighted*/}
          {/*      ? theme.palette.common.white*/}
          {/*      : theme.palette.primary.dark*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<Box ml={1}>*/}
            <Typography
              className={highlighted ? "text-white" : null}
              variant={highlighted ? "h6" : "body1"}
            >
              {lesion.text.substring(0, 100)}...
            </Typography>
          {/*</Box>*/}
        </Box>
      ))}
    </div>:<div/>
  );
}

PriceCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  pricing: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  highlighted: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(PriceCard);
