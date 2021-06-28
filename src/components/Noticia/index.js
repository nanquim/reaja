import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Bookmark from "@material-ui/icons/Bookmark";
import ShareIcon from "@material-ui/icons/Share";
import Close from "@material-ui/icons/Close";
import MicIcon from "@material-ui/icons/Mic";
import firebase from "../../firebase";
import Share from "../Share";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 450,
    margin: "0 auto",
    marginTop: "3%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  saved: {
    color: "red",
  },
  acoes: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "3%",
    "& > *": {
      color: "rgba(0, 0, 0, 0.54)"
    }
  }
}));

function Noticia({ item, remove }) {
  const classes = useStyles();

  const [saved, setSaved] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const routeTo = () => {
    window.open(item.url);
  };

  /* TODO o refresh perde o estilo salvo CONTEXT*/
  const save = (n) => {
    if (!firebase.getCurrentUser()) {
      //TODO quero que abra modal com o registro/login
      alert("Você precisa estar logado para salvar");
    } else {
      try {
        firebase.getDb().ref("/salvos/").push({
          usuario: firebase.getCurrentUser().uid,
          noticia: n,
        });
        setSaved(true);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleOpenShare = () => {
    setShowShare(true);
  };

  const fechou = () => {
    setShowShare(false);
  };

  const handleMicrofone = () => {
    console.log('TODO MICROFONE')
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea
          className={classes.acoes}
        >
          <MicIcon
              onClick={handleMicrofone}>
          </MicIcon>
          <Close 
              className={classes.areaIcones}
              onClick={() => remove(item)}>
          </Close>
        </CardActionArea>
        <CardHeader
          title={item.title}
          subheader={item.publishedAt}
        />
        <CardMedia
          className={classes.media}
          image={item.urlToImage}
          title={item.title}
          onClick={() => routeTo()}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Ler depois" onClick={() => save(item)}>
            <Bookmark className={saved ? classes.saved : null} />
          </IconButton>
          <IconButton aria-label="Share" onClick={(e) => handleOpenShare(e)}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      {showShare ? <Share item={item} fechou={fechou} /> : null}
    </div>
  );
}

export default Noticia;
