import React, { useState } from 'react';
import AvatarEdit from 'react-avatar-edit'
import AvatarPreview from './Avatar'
import { Button, KIND, SHAPE} from "baseui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE
} from "baseui/modal";
import {Error} from '../../common/Notifications'
import {server} from '../../../api'

const AvatarUploadModal = ({ isOpen, onSave, onClose }) => {
    const [sourceImg, setSourceImg] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState();

    // const onClose = () => setPreview(null);
    const onCrop = preview => setPreview(preview)
    // const onBeforeFileLoad = elem => {
    //     if(elem.target.files[0].size > 1.5e6){
    //       alert("File is too big!");
    //       elem.target.value = "";
    //     };
    // }
    const saveImage = () => {
        server.saveAvatar(preview)
            .then((resp) => {
                if (resp.error) setError(resp.error)
                else onSave(preview) 
            })
            .catch(err => setError('General error. Could not upload.')) 
    }

    return (<Modal
        onClose={onClose}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
    >
        <ModalHeader>Upload avatar</ModalHeader>
        <ModalBody>
            <Error message={error} />
            <AvatarEdit
                src={sourceImg}
                width={300}
                imageWidth={300}
                onCrop={onCrop}
                onClose={() => setPreview(null)}
                exportMimeType='image/jpeg'
            />
        </ModalBody>
        <ModalFooter>
            <ModalButton kind="secondary" onClick={onClose}>Cancel</ModalButton>
            <ModalButton kind="primary" onClick={saveImage}>Save</ModalButton>
        </ModalFooter>
    </Modal>)
}

export default AvatarUploadModal