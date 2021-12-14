import { React, useContext, useEffect } from 'react';
import ScreenDivider from '../sceenDivider/ScreenDivider';
import ButtonBarr from '../buttonBar/ButtonBarr';
import VideoContainer from '../videoContainer/VideoContainer';
import Video from '../Video/Video';
import { SocketContext } from '../../SocketContext';
import SwalName from 'sweetalert2';
import { Notifications } from '../Notifications';
import borderless from '@sweetalert2/theme-borderless'
const Room = () => {
    const { myVideo, name, callAccepted, userVideo, callEnded, stream, call, setName } = useContext(SocketContext)

    const namePomp = async () => {
        const { value: Name } = await SwalName.fire({
            title: 'Enter your name',
            input: 'text',
            inputPlaceholder: 'name',
            inputAttributes: {
                maxlength: 10,
                autocapitalize: 'off',
                autocorrect: 'off'
            },
            theme: borderless
        })
        if (Name) {
            setName(Name)
        } else {
            await SwalName.fire('name is required!', '', 'error')
            namePomp();
        }
    }

    Notifications()


    useEffect(async () => {

        namePomp();
    }, [])

    return (
        <div>
            <ScreenDivider>
                <VideoContainer >
                    {stream && (<Video muted={true} Video={myVideo}></Video>)}
                    {callAccepted && !callEnded && (<Video muted={false} Video={userVideo}></Video>)}
                </VideoContainer>

                <ButtonBarr></ButtonBarr>
            </ScreenDivider>

        </div>
    )
}

export default Room
