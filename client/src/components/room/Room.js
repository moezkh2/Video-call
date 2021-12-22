import { React, useContext, useEffect } from 'react';
import ScreenDivider from '../sceenDivider/ScreenDivider';
import ButtonBarr from '../buttonBar/ButtonBarr';
import VideoContainer from '../videoContainer/VideoContainer';
import Video from '../Video/Video';
import { SocketContext } from '../../SocketContext';
import SwalName from 'sweetalert2/src/sweetalert2.js';
import { Notifications } from '../Notifications';
const Room = () => {
    const { myVideo, callAccepted, userVideo, callEnded, stream, setName, name } = useContext(SocketContext)

    const namePomp = async () => {
        const { value: Name } = await SwalName.fire({
            title: 'Enter your name',
            input: 'text',
            inputValue: name,
            inputPlaceholder: 'name',
            inputAttributes: {
                maxlength: 10,
                autocapitalize: 'off',
                autocorrect: 'off'
            },
        })
        if (Name) {
            setName(Name)
            localStorage.setItem("call--me-name", Name)
        } else if (name !== '') {
            return
        } else {
            await SwalName.fire('name is required!', '', 'error')
            namePomp();
        }
    }

    Notifications()


    useEffect(() => {
        console.log(localStorage.getItem("call--me-name"))
        let localName = localStorage.getItem("call--me-name");
        if (localName === undefined || localName === null) {
            namePomp();
        } else {
            setName(localName)
        }

    }, [])

    return (
        <div>
            <ScreenDivider>
                <VideoContainer >
                    {stream && (<Video muted={true} Video={myVideo}></Video>)}
                    {callAccepted && !callEnded && (<Video muted={false} Video={userVideo}></Video>)}
                </VideoContainer>

                <ButtonBarr namePomp={namePomp}  ></ButtonBarr>
            </ScreenDivider>

        </div >
    )
}

export default Room
