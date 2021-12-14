import React, { useContext, useState } from 'react'
import './buttonBarr.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faMicrophoneAlt, faMicrophoneSlash, faPhoneAlt, faPhoneSlash, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import { SocketContext } from '../../SocketContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SwalIdToCall from 'sweetalert2'
import SwalCopy from 'sweetalert2'
const ButtonBarr = () => {
    const { me, callAccepted, name, callEnded, leaveCall, callUser, camState, micState, stopVideo, mutMic } = useContext(SocketContext)
    const [idToCall, setIdToCall] = useState()
    console.log(me)
    const idToCallPomp = async () => {
        const { value: IdToCall } = await SwalIdToCall.fire({
            title: 'Enter the id of the person to call',
            input: 'text',
            showCancelButton: true,
            inputPlaceholder: 'id',
            inputAttributes: {
                autocapitalize: 'off',
                autocorrect: 'off'
            },
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })

        if (IdToCall) {
            /* setIdToCall(IdToCall) */
            callUser(IdToCall)
        }

    }


    return (
        <div id='button-Barr'>
            <button
                id='camera'
                className={camState ? 'success' : 'danger'}
                onClick={stopVideo}>
                <FontAwesomeIcon icon={camState ? faVideo : faVideoSlash} />
            </button>
            <button
                id='mic'
                className={micState ? 'success' : 'danger'}
                onClick={mutMic}>
                <FontAwesomeIcon icon={micState ? faMicrophoneAlt : faMicrophoneSlash} />
            </button>
            {callAccepted && !callEnded ?

                (<button
                    id='endCall'
                    className='danger'
                    onClick={leaveCall}>
                    <FontAwesomeIcon icon={faPhoneSlash} />
                </button>) :
                <button
                    id='call'
                    className='normal'
                    onClick={() => { idToCallPomp() }}>
                    <FontAwesomeIcon icon={faPhoneAlt} />
                </button>
            }

            <CopyToClipboard text={me}>
                <button
                    id='CoppieId'
                    className='normal'
                    onClick={() => SwalCopy.fire({
                        icon: 'success',
                        title: 'id copied',
                        timer: 1000
                    })}>
                    <FontAwesomeIcon icon={faCopy} />
                </button>
            </CopyToClipboard>

        </div>
    )
}
export default ButtonBarr
