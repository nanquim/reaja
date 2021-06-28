import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,
    TumblrShareButton,
    PocketShareButton,

    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    PinterestIcon,
    TelegramIcon,
    WhatsappIcon,
    RedditIcon,
    TumblrIcon,
    EmailIcon,
    PocketIcon,
} from 'react-share';
import { Modal } from '@material-ui/core'
/* import './styles.css' */

function getModalStyle() {
    const top = 25

    return {
        top: `${top}%`,
        margin: 'auto'
    };
}
const useStyles = makeStyles(theme => ({
    modal: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        /*  padding: theme.spacing(4), */
        width: '30%',
        height: '25%',
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    network: {
        margin: '2vh',
    },
    shareButton: {
        cursor: 'pointer',
    }
}));

function Share({ item, fechou }) {

    const classes = useStyles()

    const [open, setOpen] = useState(true)


    const handleCloseShare = () => {
        setOpen(false)
        fechou()
    }

    return (
        <Modal
            open={open}
            onClose={handleCloseShare}
            className={classes.modal}
            style={getModalStyle()}
        >
            <div className={classes.wrapper}>
                <div className={classes.network}>
                    <FacebookShareButton
                        url={item.url}
                        quote={item.title}
                        className={classes.shareButton}>
                        <FacebookIcon
                            size={32}
                            round />
                    </FacebookShareButton>
                </div>

                <div className={classes.network}>
                    <TwitterShareButton
                        url={item.url}
                        title={item.title}
                        className={classes.shareButton}>
                        <TwitterIcon
                            size={32}
                            round />
                    </TwitterShareButton>
                </div>

                <div className={classes.network}>
                    <TelegramShareButton
                        url={item.url}
                        title={item.title}
                        className={classes.shareButton}>
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                </div>

                <div className={classes.network}>
                    <WhatsappShareButton
                        url={item.url}
                        title={item.title}
                        separator=":: "
                        className={classes.shareButton}>
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </div>

                <div className={classes.network}>
                    <LinkedinShareButton
                        url={item.url}
                        windowWidth={750}
                        windowHeight={600}
                        className={classes.shareButton}>
                        <LinkedinIcon
                            size={32}
                            round />
                    </LinkedinShareButton>
                </div>

                <div className={classes.network}>
                    <PinterestShareButton
                        url={String(window.location)}
                        media={`${String(window.location)}/${item.urlToImage}`}
                        windowWidth={1000}
                        windowHeight={730}
                        className={classes.shareButton}>
                        <PinterestIcon size={32} round />
                    </PinterestShareButton>
                </div>

                <div className={classes.network}>
                    <RedditShareButton
                        url={item.url}
                        title={item.title}
                        windowWidth={660}
                        windowHeight={460}
                        className={classes.shareButton}>
                        <RedditIcon
                            size={32}
                            round />
                    </RedditShareButton>
                </div>

                <div className={classes.network}>
                    <TumblrShareButton
                        url={item.url}
                        title={item.title}
                        windowWidth={660}
                        windowHeight={460}
                        className={classes.shareButton}>
                        <TumblrIcon
                            size={32}
                            round />
                    </TumblrShareButton>
                </div>

                <div className={classes.network}>
                    <EmailShareButton
                        url={item.url}
                        subject={item.title}
                        body="body"
                        className={classes.shareButton}>
                        <EmailIcon
                            size={32}
                            round />
                    </EmailShareButton>
                </div>

                <div className={classes.network}>
                    <PocketShareButton
                        url={item.url}
                        title={item.title}
                        className={classes.shareButton}>
                        <PocketIcon
                            size={32}
                            round />
                    </PocketShareButton>
                </div>
            </div>
        </Modal>
    )
}

export default Share
